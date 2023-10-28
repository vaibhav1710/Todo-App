import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container, Form, Button, ListGroup, Badge } from "react-bootstrap";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  CaretDownFill,
  CaretUpFill,
  PencilSquare,
  XSquareFill,
} from "react-bootstrap-icons";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setActive] = useState(false);
  const [task, setTask] = useState([
    {
      Title: "demo",
      Description: "demo description",
    },
  ]);

  const [updating, setUpdating] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !description){
        return toast.warn(`All fields required`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); 
    }
    try {
      const res = await fetch("/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        return toast.error(`Submit Failed`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); 
      } else {
        return toast.success(`Task added successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGET = async () => {
    const res = await fetch("/getTask", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    const { list } = data;
    
    setTask(list);
  };

  useEffect(() => {
    handleGET();
  }, [task]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (res.status === 401) {
        return toast.warn('Delete Failed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); 
      } else {
        toast.success('Task Deleted Successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (err) {
      return toast.error(`${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
    }
  };

  const populateFields = (e) => {
    setTitle(e.title);
    setDescription(e.description);
    setCurrentId(e._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      return toast.warn('"All fields are required!"', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
    }
    const res = await fetch(`/updates/${currentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const data = await res.json();

    const { list } = data;

    setTask(list);
    setCurrentId("");

    setUpdating(false);
  };

  return (
    <Container>
    <ToastContainer/>
    <h1 className="d-flex justify-content-center mt-4">TODO APP</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <Badge bg="dark">Title</Badge>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            <Badge bg="dark">Description</Badge>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Description Here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        {updating ? (
          <Button
            className="mt-1"
            variant="outline-success"
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </Button>
        ) : (
          <Button
            className="mt-1"
            variant="outline-success"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </Form>
      <ListGroup className="mt-4">
        {task &&
          task.map((e) => {
            return (
              <li className="accordion-item">
                <div
                  className="accordion-toggle"
                  onClick={() => setActive(!isActive)}
                >
                  <h3 className="txt">{e.title}</h3>
                  <span
                    onClick={() => {
                      setUpdating(true);
                      populateFields(e);
                    }}
                  >
                    <PencilSquare />
                  </span>
                  <span
                    onClick={() => {
                      handleDelete(e._id);
                    }}
                  >
                    <XSquareFill />
                  </span>
                  <span onClick={() => setActive(!isActive)}>
                    {isActive ? <CaretUpFill /> : <CaretDownFill />}
                  </span>
                </div>
                {isActive && (
                  <div className="accordion-content">{e.description}</div>
                )}
              </li>
            );
          })}
      </ListGroup>
    </Container>
  );
};

export default Todo;
