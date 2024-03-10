import { NextPage } from "next";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import {
  faHashtag,
  faKitchenSet,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const STAFF_URL = `${process.env.BACKEND_URL}/staffs/new`;

const Register: NextPage = () => {
  const initialData = {
    username: "",
    role: "",
    password: "",
    staffNumber: "",
    repassword: "",
  };

  const [formData, setFormData] = useState(initialData);
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = formData;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const FETCHED_DATA = await fetch(STAFF_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();

    if (FETCHED_JSON.status === "success") {
      toast.success("Амжилттай бүртгэгдлээ");
    }
    if (FETCHED_JSON.status === "Ajiltan burtgeltei baina") {
      toast.error("Хэрэглэгч бүртгэлтэй байна");
    }
    if (FETCHED_JSON.status === "Talbariig buren bugulnu uu") {
      toast.error("Талбарыг бүрэн бөгөлнө үү!");
    }
    if (FETCHED_JSON.status === "success") {
      router.push("/");
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mb-4 rounded-0">
              <Card.Body className="p-4">
                <h1>Register</h1>
                <p className="text-black-50">Create your account</p>

                <Form>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} fixedWidth />
                    </InputGroup.Text>
                    <Form.Control
                      name="username"
                      required
                      placeholder="Username"
                      aria-label="Username"
                      onChange={handleChange}
                    />
                  </InputGroup>
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
                      <FontAwesomeIcon icon={faKitchenSet} fixedWidth />
                    </InputGroup.Text>
                    <Form.Select
                      name="role"
                      onChange={handleChange}
                      className="text-secondary"
                    >
                      <option>Select role</option>
                      <option>Kitchen</option>
                      <option>Reception</option>
                      <option>Waiter</option>
                    </Form.Select>
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

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} fixedWidth />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="repassword"
                      required
                      placeholder="Repeat password"
                      aria-label="Repeat password"
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <Button
                    type="submit"
                    className="d-block w-100"
                    variant="success"
                    href=""
                    onClick={handleSubmit}
                  >
                    Create Account
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
