import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UploadModal = ({
  show,
  handleClose,
  project,
  repositoryLink,
  setRepositoryLink,
  handleRepositoryUpload,
  handleFileChange,
  handleUpload,
  selectedFiles,
  error,
}) => {
  const [isEditingRepoLink, setIsEditingRepoLink] = useState(false);

  if (!project) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Upload Files & Repository for {project.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* FILE UPLOAD SECTION */}
        <h5>Files</h5>
        <ul>
          {project.projectFiles?.length > 0 ? (
            project.projectFiles.map((file, index) => (
              <li key={index}>
                File {index + 1} ({file.url.split(".").pop().toUpperCase()})
                <a href={file?.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline-primary" size="sm" className="ms-2">
                    View
                  </Button>
                </a>
              </li>
            ))
          ) : (
            <li>No files uploaded</li>
          )}
        </ul>

        {/* REPOSITORY LINK SECTION */}
        <h5>Repository Link</h5>
        {isEditingRepoLink ? (
          <Form.Group controlId="formRepoLink" className="mt-3">
            <Form.Control
              type="url"
              value={repositoryLink}
              onChange={(e) => setRepositoryLink(e.target.value)}
              placeholder="Enter a new GitHub repository link"
            />
            <Button
              variant="primary"
              onClick={() => {
                handleRepositoryUpload();
                setIsEditingRepoLink(false);
              }}
              disabled={!repositoryLink.trim()}
              className="mt-2"
            >
              Update Repository Link
            </Button>
            {error && <div className="text-danger mt-2">{error}</div>}
          </Form.Group>
        ) : (
          <div>
            {project.repositoryLink ? (
              <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer">
                {project.repositoryLink}
              </a>
            ) : (
              <span className="text-muted">No repository link available</span>
            )}
            <Button variant="outline-secondary" size="sm" onClick={() => setIsEditingRepoLink(true)} className="ms-2">
              Edit
            </Button>
          </div>
        )}

        {/* FILE UPLOAD SECTION */}
        <Form.Group controlId="formFile" className="mt-3">
          <Form.Label>Upload Files</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!selectedFiles || selectedFiles.length === 0}
            className="mt-2"
          >
            Upload
          </Button>
          {error && <div className="text-danger mt-2">{error}</div>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadModal;
