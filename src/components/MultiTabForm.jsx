import React, { useState } from "react";
import { Tab, Tabs, Form, Button, Alert } from "react-bootstrap";

const MultiTabForm = () => {
  const [key, setKey] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    interests: [],
    notifications: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const interestsList = ["Music", "Sports", "Reading", "Traveling"];

  const validateProfile = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters long";
    if (!formData.age || isNaN(formData.age) || formData.age < 18)
      newErrors.age = "Age must be a number and at least 18";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateInterests = () => {
    if (formData.interests.length === 0) {
      setErrors({ interests: "Please select at least one interest" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => {
      const updatedInterests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updatedInterests };
    });
  };

  const handleSubmit = () => {
    if (validateProfile() && validateInterests()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container mt-3">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="profile" title="Profile">
          <Form className="my-3">
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-warning">Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                isInvalid={!!errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label className="text-warning">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <h5 className="text-danger mt-3">
            Please select your Interest in Interest tab and click on Submit
          </h5>
        </Tab>
        <Tab eventKey="interests" title="Interests">
          <Form className="my-3">
            {interestsList.map((interest) => (
              <Form.Check
                key={interest}
                type="checkbox"
                label={interest}
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
            ))}
            {errors.interests && (
              <Alert variant="danger">{errors.interests}</Alert>
            )}
          </Form>
        </Tab>
        <Tab eventKey="settings" title="Settings">
          <Form.Check
            className="my-3"
            type="checkbox"
            label="Enable Notifications"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
          />
        </Tab>
      </Tabs>
      <div className="mt-3">
        <Button onClick={handleSubmit} variant="success">
          Submit
        </Button>
      </div>
      {submitted && (
        <Alert variant="success" className="mt-3">
          <h4>Summary</h4>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Age:</strong> {formData.age}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Interests:</strong> {formData.interests.join(", ")}
          </p>
          <p>
            <strong>Notifications:</strong>{" "}
            {formData.notifications ? "Enabled" : "Disabled"}
          </p>
        </Alert>
      )}
    </div>
  );
};

export default MultiTabForm;
