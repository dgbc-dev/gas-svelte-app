<script>
  import { Route, Router } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import InitialLoad from "./components/InitialLoad.svelte";
  import Home from "./routes/Home.svelte";
  // import Profile from "./routes/Profile.svelte";
  import HeaderBar from "./components/HeaderBar.svelte";
  import Toaster from "./components/Toaster.svelte";
  import { onMount } from "svelte";
  import {
    // sessionUser,
    isLoading,
  } from "./stores";
  import { GAS_API } from "./lib/GAS_API";
  import Members from "./routes/Members.svelte";

  /**
   *
   * @param event
   * @property {string} event.detail.alertType
   * @property {string} event.detail.message
   * @property {number} event.detail.time
   */
  function handleNewToast(event) {
    console.log(event.detail);
    toasts = [...toasts, event.detail];
    setTimeout(() => {
      toasts = toasts.filter((toast) => toast.id !== event.detail.id);
    }, event.detail.milliseconds);
  }

  let isDrawerOpen = false;
  const toggleDrawer = () => {
    isDrawerOpen = !isDrawerOpen;
  };

  let toasts = [];
  let churchName = "Member Management";

  onMount(() => {
    fetchSettings();
  });

  async function fetchSettings() {
    try {
      const settings = await GAS_API.getSettings();
      churchName = settings.churchName;
    } catch (error) {
      console.error("Could not get settings:", error);
    }
  }
</script>

<Router>
  <div class="drawer min-h-screen">
    <input
      id="nav-drawer-control"
      type="checkbox"
      class="drawer-toggle"
      checked={isDrawerOpen}
      on:change={toggleDrawer}
    />
    <div class="drawer-content bg-base-200">
      <!-- Page content here -->
      <HeaderBar title={churchName} />
      <main class="container mx-auto pb-8">
        <Route path="/">
          <Home on:newToast={handleNewToast} />
        </Route>
        <Route path="members">
          <Members />
        </Route>
      </main>
    </div>
    <div class="drawer-side">
      <!-- Sidebar content here -->
      <label for="nav-drawer-control" class="drawer-overlay" />
      <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content pt-16">
        <NavLink to="/" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </NavLink>

        <NavLink to="/members" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          Members
        </NavLink>
        <div class="divider" />
      </ul>
    </div>
  </div>
</Router>
<Toaster {toasts} />
