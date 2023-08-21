import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "./Inquiry.css";
import {AiOutlineCamera} from 
'react-icons/ai'
import { useSelector } from "react-redux";
import { Box, Input, Textarea, Heading,Button } from "@chakra-ui/react";
function Inquiry() {
    
  const userProfileData = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);
  const [email, setEmail] = useState(userProfileData.email);
  const [problem, setProblem] = useState("");
  const [subject, setSubject] = useState("");
  const [paragraph, setParagraph] = useState(
    ""
  );
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!problem) {
      toast.error("Please describe your problem");
      return;
    }
    if (!subject) {
      toast.error("Please enter a subject");
      return;
    }
    if (!paragraph) {
      toast.error("Please enter a paragraph");
      return;
    }

    const formData = new FormData();
    // ... existing form data appending code
    formData.append("email", email);
    formData.append("problem", problem);
    formData.append("subject", subject);
    formData.append("paragraph", paragraph);
    // files.forEach((file, i) => {
    formData.append(`files`, JSON.stringify(files));
    // });
    // Send data to the API
    try {
      const response = await fetch("https://admin.myuni-hub.com/api/inquiry", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Data submitted successfully");
      } else {
        toast.error("Error submitting data");
      }
    } catch (error) {
      toast.error("There was an error sending the data");
    }
  };
  return (
    <div className="inquiry-container">
      <form onSubmit={handleSubmit}>
        <div className="values" style={{margin:"40px 0px 0px 0px"}}>
       {/* {token &&   <Box
            className="outline-box"
            borderWidth="1px"
            borderRadius="lg"
            m="0px"
            p={4}
          >
            <Heading as="h3" size="md">
              Email
            </Heading>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="unstyled"
            />
          </Box>} */}
          <Box
            className="outline-box"
            borderWidth="1px"
            borderRadius="lg"
            m="0px"
            p={4}
          >
            <Heading as="h3" size="md">
              Problem
            </Heading>
            <Input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              variant="unstyled"
            />
          </Box>
          <Box
            className="outline-box"
            borderWidth="1px"
            borderRadius="lg"
            p={4}
          >
            <Heading as="h3" size="md" mb={2}>
              Subject
            </Heading>
            <Input
              variant={"unstyled"}
              defaultValue=""
              resize="none"
              placeholder="Enter description here"
              rows={4}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Box>
          <Box
            className="outline-boxs"
            borderWidth="1px"
            borderRadius="lg"
            p={4}
          >
            <Heading as="h3" size="md" mb={2}>
              Paragraph
            </Heading>
            <Textarea
              variant={"unstyled"}
              defaultValue=""
              resize="none"
              placeholder="Enter description here"
              rows={4}
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            />
          </Box>
        <Box
            className="outline-box"
            borderWidth="1px"
            borderRadius="lg"
            p={4}
          >
            <span style={
                {
                    fontSize:"40px",
                    display:"flex",
                    justifyContent:"center"
                }
            }>
            <AiOutlineCamera/>
            </span>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <span>Drag 'n' drop some files here, or click to select files</span>
        </div>
        </Box>
        </div>
        <div className="primary-btn">
          <Button type="submit" bg="#7BB564" color={"white"} variant="solid" width={"100%"}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Inquiry;
