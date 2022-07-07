<script lang="ts">
  import prompts from "../../../sample.json";
  const range8 = [...Array(8).keys()];
</script>

<svelte:head>
  <title>Text-to-Image Comparison</title>
</svelte:head>

<header>
  <h1>
    Comparison between open source text-to-image models: dalle [ <a
      href="https://github.com/borisdayma/dalle-mini">mini</a
    >,
    <a href="https://github.com/borisdayma/dalle-mini">mega</a>,
    <a href="https://github.com/borisdayma/dalle-mini">mega-full</a>
    ], and <a href="https://github.com/cene555/Imagen-pytorch">imagen</a>.
  </h1>
  <p>
    Prompts sampled from <a
      href="https://github.com/google-research/parti/blob/main/PartiPrompts.tsv">PartiPrompts</a
    > and ran on July 6, 2022.
  </p>
</header>
<main>
  <section class="meta" />
  <section class="models">
    {#each ["mini", "mega", "mega-full", "imagen"] as model}
      <section class="model">
        {#each prompts as prompt}
          <div class="gap">
            {#if model === "mini"}
              <div class="prompt">{prompt}</div>
            {/if}
            <div class="model-name">
              {model}
            </div>
          </div>
          {#each range8 as i}
            <img
              src="api/image?name={`${model}:${prompt}:${i}.jpeg`}"
              alt="generated"
            />
          {/each}
        {/each}
      </section>
    {/each}
  </section>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap");
  @import url("https://rsms.me/inter/inter.css");
  :global(html) {
    font-family: "Inter", sans-serif;
  }
  @supports (font-variation-settings: normal) {
    :global(html) {
      font-family: "Inter var", sans-serif;
    }
  }

  :global(:root) {
    --meta-width: min(400px, 30vw);
  }

  :global(body) {
    margin: 0;
    padding: 0 2rem 4rem;
    background-color: #090909;
    color: #dedede;
  }

  :global(*) {
    box-sizing: border-box;
  }

  header {
    padding: 26vh 0;
    max-width: 1000px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    text-align: center;
  }

  p {
    text-align: center;
    font-size: 1.6rem;
  }

  a {
    font-family: "IBM Plex Mono", monospace;
    color: orangered;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  main {
    display: flex;
  }

  .meta {
    width: var(--meta-width);
  }

  .prompt {
    position: absolute;
    width: var(--meta-width);
    --height: 350px;
    font-size: 1.9rem;
    height: 350px;
    transform: translate(calc(-1 * var(--meta-width)), calc(175px - 1.25rem));
    padding-right: 2rem;
  }

  .model-name {
    font-family: "IBM Plex Mono", monospace;
    color: #aaa;
  }

  .models {
    flex: 1;
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .gap {
    line-height: 2.5rem;
    display: flex;
    align-items: center;
    grid-column: span 2;
    font-size: 1.65rem;
    padding: 1rem 0;
  }

  .model {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-tracks: center;
    justify-tracks: center;
    gap: 5px;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>
