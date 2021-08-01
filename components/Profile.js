import styles from "../styles/Profile.module.css";
import firebase from "firebase/app";
import styled from "styled-components";

// ------------style

const MobileView = styled.div`
  display: none;
  @media (max-width: 991px) {
    display: block;
  }
`;

function Profile() {
  function signOut() {
    // [START auth_sign_out]
    firebase
      .auth()
      .signOut()
      .then(() => {
        currentUser();
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    // [END auth_sign_out]
  }
  return (
    <div className={styles.dropdown}>
      <svg
        style={{ float: "right", marginTop: "10px" }}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M49.5 24.9999C49.5 38.5309 38.531 49.4999 25 49.4999C11.469 49.4999 0.5 38.5309 0.5 24.9999C0.5 11.469 11.469 0.5 25 0.5C38.531 0.5 49.5 11.469 49.5 24.9999Z"
          fill="#F8EBD1"
          stroke="#4B4B60"
        />
        <path
          d="M44.41 40.7485C42.0675 43.6382 39.1093 45.9683 35.7514 47.5689C32.3935 49.1694 28.7206 50 25.0007 50C21.2808 50 17.6079 49.1694 14.25 47.5689C10.8921 45.9683 7.93393 43.6382 5.59143 40.7485C8.74188 36.8989 13.0968 34.2222 17.9543 33.15C17.8573 35.1991 18.2205 37.2439 19.0171 39.1343C20.3957 35.9914 25.0014 35.7057 25.0014 35.7057C25.0014 35.7057 29.6071 35.9814 30.9457 39.1343C31.7627 37.25 32.1267 35.2004 32.0086 33.15C36.1429 34.2128 41.1814 36.3785 44.41 40.7485Z"
          fill="#4B4B60"
        />
        <path
          d="M30.6314 30.7084C30.6314 30.7084 30.9071 33.5427 25.0013 35.7484C25.0013 35.7484 29.6071 36.0241 30.9456 39.177C31.0256 39.2513 33.6628 32.4013 30.6314 30.7084Z"
          fill="#FBB300"
        />
        <path
          d="M19.37 30.7084C16.3386 32.4013 18.9757 39.2513 19.0557 39.137C20.4343 35.9941 25 35.7084 25 35.7084C19.0943 33.5427 19.37 30.7084 19.37 30.7084Z"
          fill="#FBB300"
        />
        <path
          d="M29.2917 6.96855C29.606 3.34713 23.8631 3.58284 23.8631 3.58284C21.4537 3.87958 19.2072 4.95565 17.4659 6.64718C15.7246 8.33871 14.5839 10.553 14.2174 12.9528L15.3988 11.5357C13.5417 15.5914 16.3431 22.5599 16.5803 23.1071C18.0374 27.9499 21.266 32.3928 25.0088 32.3928C28.7517 32.3928 31.9774 27.9442 33.4374 23.1071V23.0671C33.5945 22.4771 33.7517 21.8857 33.866 21.2957H33.826C34.6131 18.1528 35.4788 14.9571 35.4788 14.9571C37.7174 3.66141 29.2917 6.96855 29.2917 6.96855ZM33.2674 20.7485C32.944 23.1931 31.8232 25.4627 30.0788 27.2056C29.7444 27.5301 29.3893 27.8326 29.016 28.1113L28.386 26.1428H21.6145L20.9845 28.1513C19.7245 27.2071 17.0874 24.5685 17.0474 22.0885C15.9446 7.95426 26.7717 10.9457 26.7717 10.9457C34.056 10.3942 33.8188 16.8114 33.2688 20.7485H33.2674Z"
          fill="#4B4B60"
        />
        <path
          d="M22.2444 27.48C22.5894 27.8719 23.0131 28.1866 23.4879 28.4037C23.9627 28.6209 24.478 28.7354 25.0001 28.74C25.5236 28.744 26.0416 28.6333 26.5177 28.4156C26.9938 28.1979 27.4164 27.8786 27.7558 27.48H22.2444Z"
          fill="white"
        />
      </svg>
      <div className={styles.dropdownContent}>
        <a href="/Dashboard/editprofile">Profile</a>
        <a href="/Template/editTemplate">Edit Template</a>
        <MobileView>
          <a href="/Dashboard/dashboard">Statistics</a>
          <a href="/Dashboard/inventory">Inventory</a>
          <a href="/Dashboard/orderlogs">Order Logs</a>
          <a href="/Dashboard/paymentlogs">Payment Logs</a>
        </MobileView>
        <a onClick={signOut}>Logout</a>
      </div>
    </div>
  );
}
export default Profile;
