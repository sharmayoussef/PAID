import Spline from '@splinetool/react-spline';

export const SplineBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Spline 
        className="w-full h-full"
        scene="https://prod.spline.design/xOY26tNBtc96iXUU/scene.splinecode" 
      />
    </div>
  );
};