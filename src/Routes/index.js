import {
  Home,
  CreatePortfolio,
  Template1Content,
  Template2Content,
  Template3Content,
} from "~/Components";
import { DefaultItemInGridTemplate1 } from "~/Routes/ComponentDefault/ComponentDefaults1";
import { DefaultItemInGridTemplate2 } from "~/Routes/ComponentDefault/ComponentDefaults2";
import { DefaultItemInGridTemplate3 } from "~/Routes/ComponentDefault/ComponentDefaults3";

export const publicRoutes = [
  {
    element: <Home />,
    path: "/",
  },

  {
    element: (
      <CreatePortfolio
        DefaultComponent={DefaultItemInGridTemplate1}
        heightDefault={2000}
      >
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
      <CreatePortfolio
        DefaultComponent={DefaultItemInGridTemplate3}
        heightDefault={3000}
      >
        <Template3Content />
      </CreatePortfolio>
    ),
    path: "/template3",
  },
];
