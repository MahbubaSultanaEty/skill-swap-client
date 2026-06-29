"use client";

import { serverMutation } from "@/lib/core/server";
import { Button, Modal, Form, TextField, Label, Input, FieldError } from "@heroui/react";
import { PencilLine } from "lucide-react";
import { useState } from "react";

export default function EditProfileModal({ userData }) {
  const [loading, setLoading] = useState(false);
  const isFreelancer = userData.role === "freelancer";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      image: formData.get("image"),
    };

    if (isFreelancer) {
      body.title = formData.get("title");
      body.bio = formData.get("bio");
      body.hourlyRate = Number(formData.get("hourlyRate"));
      const skillsRaw = formData.get("skills");
      body.skills = skillsRaw
        ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
    }

    await serverMutation(
  `/api/users/${userData._id}`,
  body,
  "PATCH"
);

    setLoading(false);
    window.location.reload();
  };

  return (
    <Modal>
      <Button
        className="w-full font-semibold"
        style={{ background: "#15803d", color: "#fff" }}
      >
        <PencilLine size={15} />
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[480px]">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading style={{ color: "#0f172a" }}>
                Edit Profile
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <Form
                className="flex flex-col gap-4"
                render={(props) => <form {...props} onSubmit={handleSubmit} />}
              >
                <TextField name="name" defaultValue={userData.name}>
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" />
                  <FieldError />
                </TextField>

                <TextField name="image" defaultValue={userData.image || ""}>
                  <Label>Profile Image URL</Label>
                  <Input placeholder="https://..." />
                  <FieldError />
                </TextField>

                <TextField name="email" isDisabled defaultValue={userData.email}>
                  <Label>Email</Label>
                  <Input />
                </TextField>

                {isFreelancer && (
                  <>
                    <TextField name="title" defaultValue={userData.title || ""}>
                      <Label>Professional Title</Label>
                      <Input placeholder="e.g. Frontend Developer" />
                      <FieldError />
                    </TextField>

                    <TextField name="skills" defaultValue={userData.skills?.join(", ") || ""}>
                      <Label>Skills (comma separated)</Label>
                      <Input placeholder="React, Next.js, Tailwind" />
                      <FieldError />
                    </TextField>

                    <TextField name="bio" defaultValue={userData.bio || ""}>
                      <Label>Bio</Label>
                      <Input placeholder="Tell clients about yourself..." />
                      <FieldError />
                    </TextField>

                    <TextField name="hourlyRate" type="number" defaultValue={userData.hourlyRate || ""}>
                      <Label>Hourly Rate (USD)</Label>
                      <Input placeholder="e.g. 40" />
                      <FieldError />
                    </TextField>
                  </>
                )}

                <Modal.Footer>
                  <Button variant="secondary" slot="close">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={loading}
                    style={{ background: "#15803d", color: "#fff" }}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}