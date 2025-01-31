<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let show = false;

  let name = "";
  let email = "";
  let roles = ["user"]; // Default role

  function handleSubmit() {
    dispatch("addMember", {
      name,
      email,
      roles
    });
    
    // Reset form
    name = "";
    email = "";
    roles = ["user"];
    dispatch("close");
  }

  function handleClose() {
    dispatch("close");
  }
</script>

<dialog class="modal" class:modal-open={show}>
  <div class="modal-box prose">
    <h3 class="font-bold text-lg">Add New Member</h3>
    
    <form 
      id="add-member-form"
      on:submit|preventDefault={handleSubmit} 
      class="flex flex-col gap-4"
    >
      <div class="form-control w-full">
        <label class="label" for="name">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          id="name"
          bind:value={name}
          class="input input-bordered w-full"
          required
        />
      </div>

      <div class="form-control w-full">
        <label class="label" for="email">
          <span class="label-text">Email</span>
        </label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class="input input-bordered w-full"
          required
        />
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Admin</span>
          <input
            type="checkbox"
            class="checkbox"
            checked={roles.includes("admin")}
            on:change={(e) => {
              if (e.target.checked) {
                roles = [...roles, "admin"];
              } else {
                roles = roles.filter(r => r !== "admin");
              }
            }}
          />
        </label>
      </div>
    </form>

    <div class="modal-action">
      <button type="button" class="btn" on:click={handleClose}>Cancel</button>
      <button type="submit" form="add-member-form" class="btn btn-primary">Add Member</button>
    </div>
  </div>

  <form method="dialog" class="modal-backdrop">
    <button on:click={handleClose}>close</button>
  </form>
</dialog> 