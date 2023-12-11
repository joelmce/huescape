import GradientCanvas from "../../components/GradientCanvas";

export default function Home() {
  return (
    <>
      <h1 className="text-lg text-bold">Huescape.</h1>
      <div className="flex items-center justify-center h-screen">
        
        <div className="flex items-center justify-center">
          <GradientCanvas/>
        </div>
      </div>
    </>
    
  )

}