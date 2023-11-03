<script lang="ts">
  import { onMount } from 'svelte';

  interface Restaurant {
    title: string;
    tested: boolean;
    area: string
  }

  let restaurants: Restaurant[] = [];
  let isLoading = true;

  onMount(async () => {
    try {
      const response = await fetch('/api/index');
      restaurants = await response.json();
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      isLoading = false; 
    }
  });
</script>


{#if isLoading}
  <p>Loading...</p> 
{:else}
<table class="restaurants-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Area</th>
      <th>Tested</th>
    </tr>
  </thead>
  <tbody>
    {#each restaurants as restaurant}
      <tr>     
        <td><a href={`https://www.google.com/search?q=${restaurant.title}+restaurant+paris`} target="_blank">{restaurant.title}</a></td>
        <td>{restaurant.area ? restaurant.area : ""}</td>
        <td>{restaurant.tested ? 'Yes' : 'No'}</td>
      </tr>
    {/each}
  </tbody>
</table>
{/if}

<style>
  
  a {
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .restaurants-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 8px;
    overflow: hidden; /* This ensures the rounded corners contain all the child elements */
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    font-family: 'Arial', sans-serif; /* modern font */
  }

  .restaurants-table th,
  .restaurants-table td {
    border-bottom: 1px solid #ddd;
    padding: 12px 15px; /* updated padding for a more spacious look */
    text-align: left;
  }

  .restaurants-table th {
    color: #3F3F3F;
    border-bottom: 2px solid #ddd; /* a stronger border for the header */
  }

  .restaurants-table tr:first-child th:first-child {
    border-top-left-radius: 8px; /* rounding the top-left corner */
  }

  .restaurants-table tr:first-child th:last-child {
    border-top-right-radius: 8px; /* rounding the top-right corner */
  }

  .restaurants-table tr:last-child td:first-child {
    border-bottom-left-radius: 8px; /* rounding the bottom-left corner */
  }

  .restaurants-table tr:last-child td:last-child {
    border-bottom-right-radius: 8px; /* rounding the bottom-right corner */
  }



  .restaurants-table tr:hover {background-color: #ebeaea;}

  .restaurants-table td {
    transition: background-color 0.3s ease-in-out;
  }

</style>
