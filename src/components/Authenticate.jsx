import { useState } from "react";
function Authenticate(props) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.data.username + ' ' + result.message);
      if(result.message == 'jwt malformed'){
        setSuccessMessage('Please correctly Fill out the Username Fully and the Password Fully');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      {successMessage && <p className = "success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </>
  );
}

export default Authenticate;
