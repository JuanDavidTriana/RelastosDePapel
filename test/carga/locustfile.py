import random
import time
from locust import HttpUser, task, between

class BookstoreUser(HttpUser):
    """
    Simula un usuario de la librería Relastos de Papel
    Realiza diferentes operaciones con diferentes frecuencias
    """
    
    # Tiempo entre peticiones (1-3 segundos)
    wait_time = between(1, 3)
    
    # Términos de búsqueda para simular búsquedas reales
    search_terms = [
        "libro", "autor", "novela", "historia", "fantasía", 
        "romance", "misterio", "ciencia ficción", "poesía", "ensayo",
        "clásico", "moderno", "infantil", "juvenil", "adulto"
    ]
    
    # IDs de libros para consultas específicas (se actualizarán dinámicamente)
    book_ids = []
    
    def on_start(self):
        """
        Se ejecuta al inicio de cada usuario
        Obtiene una lista de IDs de libros disponibles
        """
        try:
            response = self.client.get("/api/books", timeout=5)
            if response.status_code == 200:
                books = response.json()
                if isinstance(books, dict) and 'content' in books:
                    # Si la respuesta es paginada
                    self.book_ids = [book.get('id') for book in books['content'] if book.get('id')]
                elif isinstance(books, list):
                    # Si la respuesta es una lista directa
                    self.book_ids = [book.get('id') for book in books if book.get('id')]
                print(f"Usuario obtenidos {len(self.book_ids)} IDs de libros")
        except Exception as e:
            print(f"Error obteniendo IDs de libros: {e}")
            # IDs por defecto si no se pueden obtener
            self.book_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    @task(40)
    def consultar_catalogo(self):
        """
        Consulta el catálogo completo de libros (40% de las peticiones)
        """
        try:
            with self.client.get("/api/books", 
                               name="GET /api/books - Consultar catálogo",
                               timeout=2.0,
                               catch_response=True) as response:
                
                if response.status_code == 200:
                    books = response.json()
                    if isinstance(books, dict) and 'content' in books:
                        # Respuesta paginada
                        if len(books['content']) > 0:
                            response.success()
                        else:
                            response.failure("Respuesta vacía")
                    elif isinstance(books, list):
                        # Respuesta directa
                        if len(books) > 0:
                            response.success()
                        else:
                            response.failure("Respuesta vacía")
                    else:
                        response.failure("Formato de respuesta incorrecto")
                else:
                    response.failure(f"Status code: {response.status_code}")
                    
        except Exception as e:
            print(f"Error consultando catálogo: {e}")
    
    @task(35)
    def buscar_libros(self):
        """
        Busca libros por término (35% de las peticiones)
        """
        search_term = random.choice(self.search_terms)
        
        try:
            with self.client.get(f"/api/books?title={search_term}",
                               name="GET /api/books?title={term} - Buscar libros",
                               timeout=2.0,
                               catch_response=True) as response:
                
                if response.status_code == 200:
                    books = response.json()
                    if isinstance(books, dict) and 'content' in books:
                        response.success()
                    elif isinstance(books, list):
                        response.success()
                    else:
                        response.failure("Formato de respuesta incorrecto")
                else:
                    response.failure(f"Status code: {response.status_code}")
                    
        except Exception as e:
            print(f"Error buscando libros: {e}")
    
    @task(20)
    def consultar_libro_especifico(self):
        """
        Consulta un libro específico por ID (20% de las peticiones)
        """
        if not self.book_ids:
            return
            
        book_id = random.choice(self.book_ids)
        
        try:
            with self.client.get(f"/api/books/{book_id}",
                               name="GET /api/books/{id} - Consultar libro específico",
                               timeout=2.0,
                               catch_response=True) as response:
                
                if response.status_code == 200:
                    book = response.json()
                    if isinstance(book, dict) and book.get('id'):
                        response.success()
                    else:
                        response.failure("Libro no encontrado o formato incorrecto")
                elif response.status_code == 404:
                    response.success()  # 404 es válido si el libro no existe
                else:
                    response.failure(f"Status code: {response.status_code}")
                    
        except Exception as e:
            print(f"Error consultando libro específico: {e}")
    
    @task(5)
    def crear_compra(self):
        """
        Crea una nueva compra (5% de las peticiones)
        """
        if not self.book_ids:
            return
            
        # Seleccionar un libro aleatorio para la compra
        book_id = random.choice(self.book_ids)
        
        # Crear datos de compra según el modelo Purchase
        purchase_data = {
            "bookId": book_id,
            "quantity": random.randint(1, 3),
            "customerEmail": f"test{random.randint(1000, 9999)}@example.com",
            "totalAmount": random.uniform(10.0, 50.0)  # Precio aleatorio
        }
        
        try:
            with self.client.post("/api/purchases",
                                json=purchase_data,
                                name="POST /api/purchases - Crear compra",
                                timeout=2.0,
                                catch_response=True) as response:
                
                if response.status_code in [200, 201]:
                    purchase = response.json()
                    if isinstance(purchase, dict) and purchase.get('id'):
                        response.success()
                    else:
                        response.failure("Compra no creada o formato incorrecto")
                else:
                    response.failure(f"Status code: {response.status_code}")
                    
        except Exception as e:
            print(f"Error creando compra: {e}")
    
    @task(1)
    def health_check(self):
        """
        Verificación de salud del sistema (1% de las peticiones)
        """
        try:
            with self.client.get("/actuator/health",
                               name="GET /actuator/health - Health check",
                               timeout=1.0,
                               catch_response=True) as response:
                
                if response.status_code == 200:
                    response.success()
                else:
                    response.failure(f"Health check falló: {response.status_code}")
                    
        except Exception as e:
            print(f"Error en health check: {e}")


class LoadTestConfig:
    """
    Configuración para las pruebas de carga
    """
    
    # Configuración de usuarios
    USERS = 10000
    SPAWN_RATE = 100  # usuarios por segundo
    RUN_TIME = "10m"  # 10 minutos
    
    # Configuración de timeouts
    TIMEOUT = 2.0  # 2 segundos máximo
    
    # Configuración de endpoints
    HOST = "http://localhost:8080"
    
    # Configuración de métricas
    EXPECTED_RPS = 5000  # Requests per second esperados
    MAX_ERROR_RATE = 0.01  # 1% máximo de errores


if __name__ == "__main__":
    """
    Ejecutar directamente con: python locustfile.py
    """
    import subprocess
    import sys
    
    print("🚀 Iniciando prueba de carga con Locust...")
    print(f"📊 Configuración:")
    print(f"   - Usuarios: {LoadTestConfig.USERS}")
    print(f"   - Spawn rate: {LoadTestConfig.SPAWN_RATE}/s")
    print(f"   - Duración: {LoadTestConfig.RUN_TIME}")
    print(f"   - Host: {LoadTestConfig.HOST}")
    print(f"   - Timeout: {LoadTestConfig.TIMEOUT}s")
    
    # Comando para ejecutar Locust
    cmd = [
        "locust",
        "-f", "locustfile.py",
        "--host", LoadTestConfig.HOST,
        "--users", str(LoadTestConfig.USERS),
        "--spawn-rate", str(LoadTestConfig.SPAWN_RATE),
        "--run-time", LoadTestConfig.RUN_TIME,
        "--headless",  # Sin interfaz gráfica
        "--html", "test-results/load-test-report.html",
        "--csv", "test-results/load-test-results"
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print("✅ Prueba de carga completada exitosamente")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error ejecutando prueba de carga: {e}")
        sys.exit(1)
    except FileNotFoundError:
        print("❌ Locust no está instalado. Instala con: pip install locust")
        sys.exit(1) 