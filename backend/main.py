from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import crud
import models
import schemas

from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate,
                db: Session = Depends(get_db)):
    return crud.create_task(db, task)


@app.get("/tasks", response_model=list[schemas.Task])
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)


@app.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int,
             db: Session = Depends(get_db)):

    task = crud.get_task(db, task_id)

    if task is None:
        raise HTTPException(status_code=404,
                            detail="Task não encontrada")

    return task


@app.put("/tasks/{task_id}",
         response_model=schemas.Task)
def update_task(task_id: int,
                task: schemas.TaskCreate,
                db: Session = Depends(get_db)):

    updated = crud.update_task(db, task_id, task)

    if updated is None:
        raise HTTPException(status_code=404,
                            detail="Task não encontrada")

    return updated


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int,
                db: Session = Depends(get_db)):

    deleted = crud.delete_task(db, task_id)

    if deleted is None:
        raise HTTPException(status_code=404,
                            detail="Task não encontrada")

    return {"message": "Task removida com sucesso"}