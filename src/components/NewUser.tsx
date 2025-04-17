'use client';
import { useState, FormEvent } from "react";
import { styled } from "@stitches/react";
import { User } from "../types/user";

const FormContainer = styled("div", {
  maxWidth: "800px",
  margin: "10px auto",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
});

const FormTitle = styled("h2", {
  marginBottom: "20px",
  color: "#333",
});

const FormGroup = styled("div", {
  marginBottom: "20px",
});

const Label = styled("label", {
  display: "block",
  marginBottom: "5px",
  fontWeight: "500",
  color: "#555",
});

const Input = styled("input", {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
  "&:focus": {
    outline: "none",
    borderColor: "#4a90e2",
    boxShadow: "0 0 0 2px rgba(74, 144, 226, 0.2)",
  },
});

const Textarea = styled("textarea", {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "16px",
  minHeight: "100px",
  resize: "vertical",
  "&:focus": {
    outline: "none",
    borderColor: "#4a90e2",
    boxShadow: "0 0 0 2px rgba(74, 144, 226, 0.2)",
  },
});

const CheckboxContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const Button = styled("button", {
  padding: "10px 20px",
  backgroundColor: "#4a90e2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3a80d2",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
});

const ErrorMessage = styled("p", {
  color: "red",
  fontSize: "14px",
  marginTop: "5px",
});

const SuccessMessage = styled("div", {
  backgroundColor: "#d4edda",
  color: "#155724",
  padding: "10px 15px",
  borderRadius: "4px",
  marginBottom: "20px",
});

const TagsContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "10px",
});

const Tag = styled("div", {
  backgroundColor: "#e1e1e1",
  borderRadius: "16px",
  padding: "5px 10px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
});

const RemoveTagButton = styled("button", {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0",
  color: "#666",
  fontSize: "14px",
  "&:hover": {
    color: "#f44336",
  },
});

const FormLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
  },
});

interface UserFormProps {
    onSubmit: (user: User) => void;
  }
  
const NewUser: React.FC<UserFormProps> = ({onSubmit}) => {
  const initialUser: User = {
    name: "",
    dob: "",
    address: {
      street: "",
      town: "",
      postcode: "",
    },
    telephone: "",
    pets: [],
    score: 0,
    email: "",
    url: "",
    description: "",
    verified: false,
    salary: 0,
  };

  const [user, setUser] = useState<User>(initialUser);
  const [errors, setErrors] = useState<
    Partial<Record<keyof User | string, string>>
  >({});
  const [newPet, setNewPet] = useState<string>("");

  const hanleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUser((prevUser) => ({
        ...prevUser,
        [parent]: {
          ...(prevUser[parent as keyof User] as Record<string, any>),
          [child]: value,
        },
      }));
    } else if (type === "checkbox") {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "number") {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value === "" ? 0 : parseFloat(value),
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    }
  };

  const addPet = () => {
    if (newPet.trim() !== "" && !user.pets.includes(newPet.trim())) {
      setUser((prevUser) => ({
        ...prevUser,
        pets: [...prevUser.pets, newPet.trim()],
      }));
      setNewPet("");
    }
  };

  const removePet = (petToRemove: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      pets: prevUser.pets.filter((pet) => pet !== petToRemove),
    }));
  };

  const validateForm = (): boolean => {
    const newError: Partial<Record<keyof User | string, string>> = {};

    if (!user.name.trim()) newError.name = "Name is required";
    if (!user.dob.trim()) newError.dob = "Date of Birth is required";
    if (!user.address.street.trim())
      newError["address.street"] = "street is required";
    if (!user.address.town.trim())
      newError["address.town"] = "town is required";
    if (!user.telephone.trim()) newError.telephone = "Phone is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      newError.email = "Email is required";
    } else if (!emailRegex.test(user.email)) {
      newError.email = "Invalid email Format";
    }

    if (user.url.trim() && !isValidUrl(user.url)) {
      newError.url = "Invalid URL";
    }

    if (user.score < 0) newError.score = "Score cannnot be negative";
    if (user.salary < 0) newError.salary = "Salary cannot be negative";

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const hanldeSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(user);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add a new User</FormTitle>
      <form onSubmit={hanldeSubmit}>
        <FormLayout>
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={hanleChange}
            ></Input>
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="dob">Date of Birth *</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={user.dob}
              onChange={hanleChange}
            />
            {errors.dob && <ErrorMessage>{errors.dob}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={hanleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="telephone">Telephone *</Label>
            <Input
              id="telephone"
              name="telephone"
              type="tel"
              value={user.telephone}
              onChange={hanleChange}
            />
            {errors.telephone && (
              <ErrorMessage>{errors.telephone}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              name="url"
              type="text"
              value={user.url}
              onChange={hanleChange}
              placeholder="https://example.com"
            />
            {errors.url && <ErrorMessage>{errors.url}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="salary">Salary *</Label>
            <Input
              id="salary"
              name="salary"
              type="number"
              value={user.salary.toString()}
              onChange={hanleChange}
              min="0"
              step="500"
            />
            {errors.salary && <ErrorMessage>{errors.salary}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="score">Score *</Label>
            <Input
              id="score"
              name="score"
              type="number"
              value={user.score.toString()}
              onChange={hanleChange}
              min="0"
              max="100"
            />
            {errors.score && <ErrorMessage>{errors.score}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <CheckboxContainer>
              <Input
                id="verified"
                name="verified"
                type="checkbox"
                checked={user.verified}
                onChange={hanleChange}
                style={{ width: "auto" }}
              />
              <Label
                htmlFor="verified"
                style={{ display: "inline", marginBottom: 0 }}
              >
                Verified User
              </Label>
            </CheckboxContainer>
          </FormGroup>
        </FormLayout>

        <FormGroup>
          <Label>Pets</Label>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              type="text"
              value={newPet}
              onChange={(e) => setNewPet(e.target.value)}
              placeholder="Add a pet"
              style={{ flexGrow: 1 }}
            />
            <Button type="button" onClick={addPet} style={{ width: "auto" }}>
              Add Pet
            </Button>
          </div>
          <TagsContainer>
            {user.pets.map((pet, index) => (
              <Tag key={index}>
                {pet}
                <RemoveTagButton type="button" onClick={() => removePet(pet)}>
                  ✕
                </RemoveTagButton>
              </Tag>
            ))}
          </TagsContainer>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address.street">Street Address *</Label>
          <Input
            id="address.street"
            name="address.street"
            type="text"
            value={user.address.street}
            onChange={hanleChange}
          />
          {errors["address.street"] && (
            <ErrorMessage>{errors["address.street"]}</ErrorMessage>
          )}
        </FormGroup>

        <FormLayout>
          <FormGroup>
            <Label htmlFor="address.town">Town/City *</Label>
            <Input
              id="address.town"
              name="address.town"
              type="text"
              value={user.address.town}
              onChange={hanleChange}
            />
            {errors["address.town"] && (
              <ErrorMessage>{errors["address.town"]}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="address.postcode">Postal Code</Label>
            <Input
              id="address.postcode"
              name="address.postcode"
              type="text"
              value={user.address.postcode || ""}
              onChange={hanleChange}
            />
            {errors["address.postcode"] && (
              <ErrorMessage>{errors["address.postcode"]}</ErrorMessage>
            )}
          </FormGroup>
        </FormLayout>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={user.description}
            onChange={hanleChange}
            placeholder="Tell us about the user..."
          />
        </FormGroup>

        <Button type="submit">Add User</Button>
      </form>
    </FormContainer>
  );
};

export default NewUser;
