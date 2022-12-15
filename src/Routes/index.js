import {
  Home,
  CreatePortfolio,
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
      <CreatePortfolio>
        <Template1Content />
      </CreatePortfolio>
    ),
    path: "/template1",
  },
  {
    element: (
      <CreatePortfolio
        DefaultComponent={DefaultItemInGridTemplate2}
        heightDefault={3000}
      >
        <Template2Content />
      </CreatePortfolio>
    ),
    path: "/template2",
  },
  {
    element: (
      <CreatePortfolio>
        <Template3Content />
      </CreatePortfolio>
    ),
    path: "/template3",
  },
];
