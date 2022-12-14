import {
  Home,
  CreatePorfolio,
  Template1Content,
  Template2Content,
  Template3Content,
} from "~/Components";
import { DefaultItemInGridTemplate2 } from "./ComponentDefaults";

export const publicRoutes = [
  {
    element: <Home />,
    path: "/",
  },

  {
    element: (
      <CreatePorfolio>
        <Template1Content />
      </CreatePorfolio>
    ),
    path: "/template1",
  },
  {
    element: (
      <CreatePorfolio
        DefaultComponent={DefaultItemInGridTemplate2}
        heightDefault={3000}
      >
        <Template2Content />
      </CreatePorfolio>
    ),
    path: "/template2",
  },
  {
    element: (
      <CreatePorfolio>
        <Template3Content />
      </CreatePorfolio>
    ),
    path: "/template3",
  },
];
