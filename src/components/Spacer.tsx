interface SpacerProps {
  className?: string;
}
const Spacer: React.FC<SpacerProps> = ({ className }) => {
  return <div 
  className="h-3"
  ></div>;
};

export default Spacer;
