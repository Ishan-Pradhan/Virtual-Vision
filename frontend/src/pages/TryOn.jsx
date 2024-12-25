import { Camera } from "../components/Camera";

function TryOn({ products }) {
  return (
    <div className=" bg-gray-100">
      <div className="container mx-auto px-4">
        {/* <Header /> */}
        <div className="max-w-3xl mx-auto">
          {/* Real-time Camera */}
          <div className="">
            <Camera />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TryOn;
