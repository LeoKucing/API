from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router

app = FastAPI(
    title="REST API CRUD Mahasiswa",
    description="API sederhana untuk sistem terdistribusi",
    version="1.0"
)

# ===============================
# CORS Middleware
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Mengizinkan semua origin (frontend HTML)
    allow_methods=["*"],      # Mengizinkan semua method HTTP
    allow_headers=["*"],      # Mengizinkan semua header
)

# ===============================
# Router
# ===============================
app.include_router(router)

# ===============================
# Root Endpoint
# ===============================
@app.get("/")
def root():
    return {"message": "API berjalan dengan baik"}
