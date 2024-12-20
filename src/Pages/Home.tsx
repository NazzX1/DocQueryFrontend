import About from "@/components/About";
import { AnimatedText } from "@/components/AnimatedText";
import FileUpload from "@/components/FileUpload";
import { Navbar } from "@/components/NavBar/NavBar";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
    const { user } = useUser();

  useEffect(() => {
    if (user) {
      const sendEmailToBackend = async () => {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        console.log(userEmail)

        

        try {
          const response = await axios.post('https://docquery.onrender.com/api/v1/login', {
            email: userEmail,
            password : "zporjg"
          });

          console.log('Email sent successfully:', response.data);
          toast({
            description: 'Logged successfully !!!',
          });
        } catch (error) {
          console.error('Error sending email:', error);
          toast({
            description: 'Failed to Login !!!',
          });
        }
      };
      const saveEmailToBackend = async () => {
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        const userName = user?.firstName;

        console.log(userEmail)

        try {
          const response = await axios.post('https://docquery.onrender.com/api/v1/register', {
            email: userEmail,
            username : userName,
            password : "zporjg"
          });

          console.log('Email sent successfully:', response.data);
          toast({
            description: 'Logged successfully !!!',
          });
        } catch (error) {
          console.error('Error sending email:', error);
          toast({
            description: 'Failed to Login !!!',
          });
        }
      };
      console.log("hello login")
      saveEmailToBackend();
      sendEmailToBackend();
    }
  }, [user]);
    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-background text-foreground flex justify-center items-center py-16 px-4">
                <div className="mx-auto max-w-screen-xl px-4 py-16 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
                    <div className="mx-auto max-w-3xl text-center lg:text-left">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent text-3xl sm:text-5xl font-extrabold mb-4 text-center">
                            Turn Complex DOC's into Easy-to-Understand Summaries in Seconds
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-center">
                            Leverage our intelligent chatbot to interact with and extract
                            information from any PDF document you provide.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-y-10 gap-x-5">
                            <a
                                className="block w-full rounded bg-primary text-primary-foreground border border-secondary px-12 py-3 text-sm font-medium focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                href="/chat"
                            >
                                Get Started
                            </a>

                            <a
                                className="block w-full bg-accent text-accent-foreground rounded border border-secondary px-12 py-3 text-sm font-medium focus:outline-none focus:ring active:bg-accent sm:w-auto"
                                href="#"
                            >
                                Learn More
                            </a>

                            <FileUpload />
                            {/* <Testimonials /> */}
                            <div>
                            <AnimatedText firstText="You Ask," secondText="We Answer" />

                            <About />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
