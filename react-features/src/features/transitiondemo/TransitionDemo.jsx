import Traditional from "./Traditional";
import Transition from "./Transition";
import ZoomableImage from "../../components/ZoomableImage";
import perfWithoutTransition from '../../assets/images/perf-without-transition.png';
import perfWithTransition from '../../assets/images/perf-with-transition.png';

function TransitionDemo() {

  return (
    <>
      <main className="max-w-6xl mx-auto p-6 w-full min-h-[80vh]">
        <h1 className="text-3xl text-center font-bold mb-8">React 19 Transition Demo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Traditional Approach (useState)</h2>
            <Traditional />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">useTransition Hook</h2>
            <Transition />
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Performance Tracks</h2>
          <p className="text-gray-700 mb-4">
            Comparison of performance tracks captured while rendering the same update:
            one without using Transition and one using Transition to defer non-urgent work.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <figure className="bg-white shadow rounded p-4">
              <ZoomableImage
                src={perfWithoutTransition}
                alt="Performance trace without Transition"
                className="w-full h-auto object-contain rounded hover:shadow-lg transition-shadow"
              />
              <figcaption className="text-sm text-gray-600 mt-2">
                Without Transition — UI may be blocked by heavy rendering.
                <span className="text-blue-600 ml-2">(Click to zoom)</span>
              </figcaption>
            </figure>
            <figure className="bg-white shadow rounded p-4">
              <ZoomableImage
                src={perfWithTransition}
                alt="Performance trace with Transition"
                className="w-full h-auto object-contain rounded hover:shadow-lg transition-shadow"
              />
              <figcaption className="text-sm text-gray-600 mt-2">
                With Transition — non-urgent updates deferred, keeping input responsive.
              </figcaption>
            </figure>
          </div>
        </div>
        <section className="bg-gray-50 py-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Understanding Transitions</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              When to use Transition? Use Transition when you have non-urgent UI updates that can be deferred to keep the interface responsive.
              Examples include updating large lists, complex calculations, or any operation that might block user interactions.
            </p>
            <p className="text-gray-700">
              By using Transition, you can ensure that critical updates (like input responsiveness) are prioritized, while less critical updates (like rendering large datasets) are handled in the background.
              This leads to a smoother user experience, especially in applications with heavy computations or frequent state changes.
            </p>
            <div>
              <h3 className="text-xl font-semibold mb-2">Important points to remember:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Transition helps in keeping the UI responsive during heavy updates</li>
                <li>It is ideal for deferring non-urgent updates</li>
                <li>Not all state updates need to be wrapped in Transition; use it judiciously</li>
                <li>When a component suspends during a transition, React will delay committing and keep the previous UI visible.</li>
                <li>Test and profile your application to see if Transition improves performance</li>
                <li>You must wrap any state updates after any async requests in another startTransition to mark them as Transitions</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TransitionDemo;
