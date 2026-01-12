from pydantic import BaseModel

class Mahasiswa(BaseModel):
    nama: str
    jurusan: str
