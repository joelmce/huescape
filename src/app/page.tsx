import GradientCanvas from "../../components/GradientCanvas";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center m-auto">
        <h1 className="inline font-bold text-xl mb-4">Huescape.</h1>
        
        <div className="flex items-center justify-center">
          <GradientCanvas/>
          
        </div>
      </div>
    </>
    
  )

}