import CloseIcon from "@mui/icons-material/Close";
import { m } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import {
  defaultFadeInVariants,
  defaultFadeInScaleVariants,
} from "src/constants/motion";
import styled, { css } from "styled-components";

interface IModal {
  isOpen: boolean;
  title?: string;
  content: string;
  path: string;
}

function onClickButton(
  _setIsOpenState: React.Dispatch<React.SetStateAction<boolean>>,
) {
  _setIsOpenState(false);
}

function Modal({ isOpen, content, title, path }: IModal) {
  const [isOpenState, setIsOpenState] = useState<boolean>(isOpen);

  return (
    <StyledModal
      isOpen={isOpenState}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={defaultFadeInVariants}
      onClick={() => {
        setIsOpenState(false);
      }}
    >
      <StyledModalMain
        initial="initial"
        animate="animate"
        exit="exit"
        variants={defaultFadeInScaleVariants}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseIcon className="close" onClick={() => setIsOpenState(false)} />
        <h1>{title}</h1>
        <p>{content}</p>
        <div className="link">
          <Link href={path}>
            <StyledButton onClick={() => onClickButton(setIsOpenState)}>
              okay
            </StyledButton>
          </Link>
        </div>
      </StyledModalMain>
    </StyledModal>
  );
}

export default Modal;

const StyledModal = styled(m.div)<{ isOpen: boolean }>`
  background-color: rgba(255, 255, 255, 0.2);
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;
const StyledModalMain = styled(m.div)`
  width: 20rem;
  height: fit-content;
  background-color: black;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.imgCard};
  display: flex;
  flex-direction: column;
  gap: 0.6125rem;
  .close {
    align-self: flex-end;
    cursor: pointer;
  }
  h1 {
    align-self: center;
  }
  z-index: 10001;
  .link {
    align-self: center;
  }
`;

const StyledButton = styled.button`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.color.borderGrey};
  padding: 10px 30px;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  transition: all 0.5s;

  &:hover {
    border: 1.5px solid ${({ theme }) => theme.color.white};
  }
`;
