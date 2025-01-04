type ButtonPropsType = {
  title: string;
  onClickhandler?: () => void;
};

export const Button = ({ title }: ButtonPropsType) => {
  return <button>{title}</button>;
};
