import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { faHashtag, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";

const STAFF_URL = `${process.env.BACKEND_URL}/staffs/login`;

export default function Login() {
  const initialData = {
    staffNumber: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);
  const router = useRouter();

  function handleChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  async function handleLogin(e: any) {
    e.preventDefault();
    const loginData = formData;

    const optios = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
    const FETCHED_DATA = await fetch(STAFF_URL, optios);
    const FETCHED_JSON = await FETCHED_DATA.json();

    if (FETCHED_JSON.success === true) {
      const user = {
        staff: FETCHED_JSON.data.staffNumber,
        token: FETCHED_JSON.token,
      };
      const userJSON = JSON.stringify(user);
      localStorage.setItem("user", userJSON);
      router.push("/home");
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mb-4 rounded-0">
              <Card.Body className="p-4">
                <h1>Log in</h1>
                <p className="text-black-50">Log in your account</p>

                <Form>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faHashtag} fixedWidth />
                    </InputGroup.Text>
                    <Form.Control
                      name="staffNumber"
                      required
                      placeholder="Staff number"
                      aria-label="staff number"
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} fixedWidth />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      placeholder="Password"
                      aria-label="Password"
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <Button
                    type="submit"
                    className="d-block w-100"
                    variant="success"
                    href=""
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <div>
                    <Link
                      className="text-black text-decoration-none"
                      href="/staff/staff-register"
                    >
                      Register
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
