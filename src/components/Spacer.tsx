interface SpacerProps {
  className?: string;
}
const Spacer: React.FC<SpacerProps> = ({ className }) => {
  return <div 
  className={`h-3 ${className}`}
  ></div>;
};

export default Spacer;
