<script>
  import { onMount } from "svelte";
  import { GAS_API } from "../lib/GAS_API";
  import { isLoading } from "../stores";
  import AddMemberModal from "../components/AddMemberModal.svelte";

  let members = [];
  let showAddMemberModal = false;

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

  async function handleAddMember(event) {
    const newMember = event.detail;
    isLoading.set(true);
    
    try {
      const response = await GAS_API.putMember(newMember);
      members = [...members, response];
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      isLoading.set(false);
    }
  }
</script>

<div class="prose max-w-none">
  <div class="flex justify-between items-center">
    <h1>Members</h1>
    <button class="btn btn-primary" on:click={() => showAddMemberModal = true}>
      Add Member
    </button>
  </div>

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

<AddMemberModal 
  show={showAddMemberModal}
  on:close={() => showAddMemberModal = false}
  on:addMember={handleAddMember}
/> 