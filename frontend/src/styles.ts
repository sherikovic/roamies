import styled from "styled-components/macro";

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #c2c2d1;
  border-radius: 8px;
  padding: 0px;
  margin-bottom: 25px;
  overflow: hidden;
  background-color: white;
`;

export const ListPageHeader = styled.section`
  display: flex;
  margin: 10px 0 10px 0;
  justify-content: space-between;
  align-items: center;
`;

export const PageHeaderText = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: inline-flex;
    font-size: 15px;
    font-weight: 550;
    margin: 0;
    padding: 0px 15px 0px 20px;
  }
  > a {
    display: flex;
    font-size: 13px;
    text-decoration: none;
    color: black;
  }
`;

export const Img = styled.img<{
  $height?: number;
  $width?: number;
  $br?: number;
}>`
  height: ${(p) => p.$height ?? 18}px;
  width: ${(p) => p.$width ?? 18}px;
  min-height: 18px;
  min-width: 18px;
  text-indent: 0px;
  border-radius: ${(p) => p.$br ?? 0}px;
`;

export const ImgWithMargin = styled(Img)`
  margin-right: 8px;
`;

export const EventItemNameDate = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  > a {
    font-size: 14px;
    padding: 0px;
    font-weight: 550;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none;
    color: black;
  }
  > h6 {
    font-size: 13px;
    color: grey;
    margin: 0px;
    font-weight: normal;
    line-height: 15px;
  }
`;

export const EventItemContent = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  height: 100%;
  > h4 {
    padding: 0px;
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const EventItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h6 {
    font-size: 11px;
    font-weight: normal;
    padding: 0px;
    margin: 0;
  }
  > a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export const FormHeader = styled.h4`
  font-size: 23px;
  font-weight: 550;
  color: black;
  margin: 0;
  text-align: center;
  padding: 30px 0 30px 0;
  &:after {
    content: "______";
    display: block;
    color: #868080;
  }
`;

export const FormContents = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5px 40px;
`;

export const Info = styled.p`
  border: 1px solid #9cae9c;
  background-color: #9cae9c;
  width: 100%;
  font-size: 14px;
  color: #152515;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.p`
  border: 1px solid #eac8c8;
  background-color: #eac8c8;
  font-size: 14px;
  color: #6c2f2f;
  margin-top: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputLabel = styled.label`
  margin-right: 10px;
`;

export const FormSubmitButton = styled.button`
  margin: 10px 40px;
`;

export const SliderContents = styled.section`
  overflow: hidden;
  padding-bottom: 20px;
`;

export const InnerSlider = styled.div<{ $translate: number }>`
  display: flex;
  padding: 0 20px 0 20px;
  transform: translateX(${(p) => p.$translate}px);
  transition: transform 0.5s ease-in-out;
`;
