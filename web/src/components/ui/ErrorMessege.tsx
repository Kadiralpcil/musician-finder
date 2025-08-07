interface ErrorMessegeProps {
  message: string;
}

const ErrorMessege = ({ message }: ErrorMessegeProps) => {
  return <p className="text-sm text-red-500">{message}</p>;
};

export default ErrorMessege;
