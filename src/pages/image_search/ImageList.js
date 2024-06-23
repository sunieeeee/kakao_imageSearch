import styled from 'styled-components';
import mq from '../../components/MediaQuery';


export const ImageContainer = styled.main`
  display: flex;
  padding: 80px 0;
  min-height: 100vh;
  background-color: #212121;

  ${mq.maxWidth("lg")`
    padding: 20px;  
  `}

  article {
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 30px;
    max-width: 1100px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 20px;

    ${mq.maxWidth("lg")`
      padding: 18px; 
      border-radius: 15px; 
    `}
  }

  form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #000;
    /* transition: 0.8s all; */

    ${mq.maxWidth("lg")`
      height: 50px;
    `}

    input {
      display: block;
      padding-left: 2%;
      width: 90%;
      height: 100%;
      border: 0;
      font-size: 48px;
      outline: none;
      color: #000;

      ${mq.maxWidth("lg")`
        font-size: 24px;
      `}
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(241, 241, 241, 1);
      outline: none;
      border: 0;
      font-size: 48px;
      width: 80px;
      height: 100%;
      border-radius: 10px;
      
      ${mq.maxWidth("lg")`
        width: 50px;
        font-size: 22px;
      `}

      &:hover {
        background-color: #000;
        color: rgba(241, 241, 241, 1);
      }
    }

    &.on {
      margin-bottom: 40px;
      width: 60%;
      height: 60px;

      ${mq.maxWidth("md")`
        margin-bottom: 20px;
        width: 100%;
        height: 50px;
      `}

      & + ul {
        opacity: 1;
      }

      input {
        font-size: 24px;

        ${mq.maxWidth("md")`
          font-size: 18px;
        `}
      }

      button {
        width: 50px;
        font-size: 24px;

        ${mq.maxWidth("md")`
          font-size: 18px;
        `}
      }
    }
  }
`;

export const ImageList = styled.ul`
  width: 100% ;
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  align-content: flex-start;
  overflow: hidden;
  opacity: 0;
  /* transition-delay: .7s; */

  .list-item {
    width: 20%;
    height: 300px;
    display: flex;
    padding: 10px;

    ${mq.maxWidth("lg")`
      width: 25%;
    `}
    ${mq.maxWidth("md")`
      width: 33.333%;
    `}
    ${mq.maxWidth("sm")`
      width: 50%;
    `}

    .list-item-link {
      border: 1px solid #d5d5d5;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: #000;
      transition: all 0.1s;

      &:hover {
        background-color: #eeeeee55;
      }

      .thumbnail {
        width: 100%;
        height: 150px;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .content {
        padding: 15px 10px;
        width: 100%;
        height: calc(100% - 150px);
        h3 {
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 18px;
        }
        ul {
          li {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
`;