import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer(null);
    setName("");
  }

  const cancel = (event) => {
    reset();
    props.onCancel();
  }

  function validate() {
    if (name === "" && !interviewer) {
      setError("Form cannot be empty");
      return;
    }
    if (name === "") {
      setError("student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    setError("");

    props.onSave(name, interviewer);
  }



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={
              function (event) {
                setName(event.target.value)
              }
            }
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          selectedInterviewer={interviewer}
          setInterviewer={key => setInterviewer(key)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}