export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center md:items-start px-8">
          <h1 className="text-4xl my-6">My philosophy</h1>
          <div className="text">
            <p className="text-xl">
              {" "}
              CanCan Education Center was created for providing educational
              opportunities to any children.
            </p>
            <p className="text-xl">
              In the world, there are 60 million children who can't go to school
              and get an education.
            </p>
            <p className="text-xl">And it is one cause of a poverty's cycle.</p>
            <p className="text-xl">
              And poverty is always the main reason people do some crimes.
            </p>
            <p className="text-xl">
              So I believe spreading a system for children easily to get an
              education makes our world better.
            </p>
            <br></br>
            <p className="text-xl">
              This web site is just a first step to create the system with
              <span className="text-xl text-blue-700 ml-2">
                decentralized systems (Blockchain, IPFS etc...)
              </span>
              .
            </p>
            <p className="text-xl">
              I will crete it which is fair, transparent and can't be interfered
              by any government.
            </p>
            <br></br>
            <p className="text-2xl font-bold text-red-500">
              "Realize the world anyone can get an education and pursue their
              dreams"
            </p>
            <br></br>
            <p className="text-xl">I run this site with this belief.</p>
          </div>
          <h1 className="text-4xl mt-7 mb-4">Welcome volunteers</h1>
          <div className="text">
            <p className="text-xl">This site will be better with your help.</p>
            <p className="text-xl">
              If you have some references, please click "Add references" on
              above and share them with children in the world.
            </p>
            <p className="text-xl">
              Your references will be open and children can access them.
            </p>
          </div>
          <h1 className="text-4xl mt-7 mb-4">Contact</h1>
          <div className="text">
            <p className="text-xl">
              If you have any questions or help, please contact
              <p className="text-xl text-pink-500">visionswipe777@gmail.com</p>
            </p>
            <p className="text-xl">Or plese visit our website from below</p>
            <a href="https://www.vision-swipe.com/">
              <p className="text-2xl font-semibold text-pink-500 hover:text-pink-300 cursor-pointer">
                Go to our site!
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
