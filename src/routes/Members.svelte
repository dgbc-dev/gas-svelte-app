<script>
  import { onMount } from "svelte";
  import { GAS_API } from "../lib/GAS_API";
  import { isLoading } from "../stores";

  let members = [];

  onMount(async () => {
    isLoading.set(true);
    try {
      const response = await GAS_API.getMembers();
      members = response;
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      isLoading.set(false);
    }
  });
</script>

<div class="prose max-w-none">
  <h1>Members</h1>

  {#if $isLoading}
    <div class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {#each members as member}
            <tr class="hover">
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.roles.join(", ")}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div> 