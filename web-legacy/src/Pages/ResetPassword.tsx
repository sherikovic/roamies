import { LoaderFunction, json, useLoaderData } from 'react-router-dom';
import { User } from 'types/user';
import { getUsers, updateUserInfo } from 'util/api';
import styled from 'styled-components/macro';
import { useState } from 'react';
import warningIcon from '../images/warningicon.png';
import { Info, ErrorMessage, ImgWithMargin } from 'util/common_styles';

const ResetPassword: React.FC = () => {
  const user = useLoaderData() as User;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const submitPasswordChange = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const formData: User | any = Object.fromEntries(data.entries());
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage('Passwords do not match!');
    } else {
      const res = await updateUserInfo({
        ...user,
        password: formData.newPassword,
      });
      if (res.status === 201) {
        setSuccessMessage(res.getJson.message);
      } else {
        setErrorMessage(res.getJson.message);
      }
    }
  };

  return (
    <form
      method="post"
      onSubmit={submitPasswordChange}
      style={{ display: 'flex ', flexDirection: 'column' }}
    >
      <h1>Create a new password</h1>
      {successMessage !== '' && (
        <Info>
          <ImgWithMargin src={warningIcon} alt="warning icon" />
          {successMessage}
        </Info>
      )}
      {errorMessage !== '' && (
        <Error>
          <ImgWithMargin src={warningIcon} alt="warning icon" />
          {errorMessage}
        </Error>
      )}
      <InputSection>
        <label htmlFor="newpassword" />
        <input
          type="password"
          name="newPassword"
          id="newpassword"
          placeholder="New Password"
        />
      </InputSection>
      <InputSection>
        <label htmlFor="confirmnewpassword" />
        <input
          type="password"
          name="confirmNewPassword"
          id="confirmnewpassword"
          placeholder="Confirm New Password"
        />
      </InputSection>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoginBtn type="submit">Submit</LoginBtn>
      </div>
    </form>
  );
};

export default ResetPassword;

export const loader: LoaderFunction = async ({ params }) => {
  const token: string | undefined = params.id;
  if (token) {
    const res = await getUsers(`resetPasswordToken=${token}`);
    if (res.getJson.objects.length > 0) {
      if (res.getJson.objects[0].resetPasswordExpires > Date.now()) {
        return res.getJson.objects[0];
      } else {
        // redirect to expired link page
        throw json(
          {
            title: 'Expired link',
            message: 'This link has expired. Please request a new one.',
          },
          { status: 410 }
        );
      }
    } else {
      // redirect to unknown token
      throw json(
        {
          title: 'Unkown user',
          message: 'No record for the requested email was found.',
        },
        { status: 404 }
      );
    }
  } else {
    // redirect to 404
    throw json(
      {
        title: 'Unkown location',
        message: "Oops..this shouldn't have happened :/",
      },
      { status: 404 }
    );
  }
};

const InputSection = styled.section`
  padding: 5px 0px;
  display: flex;
  justify-content: center;
  > input {
    width: 30%;
    background-color: white;
    border: 1.5px solid #d8d0d0;
    border-radius: 15px;
    padding: 12px 8px;
    font-size: 15px;
    ${(p) => p.$isInvalid && 'border-color: rgba(255, 0, 0, 0.296);'}
    &:focus,
		&:hover {
      outline: none;
      border: 1.5px solid grey;
    }
  }
`;

const LoginBtn = styled.button`
  width: 10%;
  font-size: 15px;
  line-height: 1.6;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 15px;
  background-color: #2c3333;
  color: white;
  border: none;
  &:hover {
    background-color: #1c2727;
  }
`;

const Error = styled(ErrorMessage)`
  width: 100%;
  height: 40px;
`;
