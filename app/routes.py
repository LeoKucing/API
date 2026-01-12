from fastapi import APIRouter
from .models import Mahasiswa

router = APIRouter()

mahasiswa_db = {}
id_counter = 1

@router.post("/mahasiswa")
def tambah_mahasiswa(data: Mahasiswa):
    global id_counter
    mahasiswa_db[id_counter] = data
    id_counter += 1
    return {
        "status": "success",
        "message": "Data mahasiswa berhasil ditambahkan"
    }

@router.get("/mahasiswa")
def get_all_mahasiswa():
    return mahasiswa_db

@router.get("/mahasiswa/{id}")
def get_mahasiswa(id: int):
    if id in mahasiswa_db:
        return mahasiswa_db[id]
    return {"error": "Data tidak ditemukan"}

@router.put("/mahasiswa/{id}")
def update_mahasiswa(id: int, data: Mahasiswa):
    if id in mahasiswa_db:
        mahasiswa_db[id] = data
        return {"message": "Data berhasil diperbarui"}
    return {"error": "Data tidak ditemukan"}

@router.delete("/mahasiswa/{id}")
def delete_mahasiswa(id: int):
    if id in mahasiswa_db:
        del mahasiswa_db[id]
        return {"message": "Data berhasil dihapus"}
    return {"error": "Data tidak ditemukan"}
