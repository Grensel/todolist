type ButtonPropsType = {
  title: string;
  onClickhandler?: () => void;
};

export const Button = ({ title, onClickhandler }: ButtonPropsType) => {
  return <button onClick={onClickhandler}>{title}</button>;
};
