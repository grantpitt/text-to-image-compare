<script lang="ts">
  import prompts from "../assets/sample.json";
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
  {#each prompts as prompt}
    <article>
      <section class="prompt">{prompt}</section>
      {#each ["mini", "mega", "mega-full", "imagen"] as model}
        <section class="model">
          <div class="model-name">{model}</div>
          {#each range8 as i}
            <img
              loading="lazy"
              src="/imgs/{`${model}/${prompt}:${i}.jpeg`}"
              alt="generated: {prompt} #{i}"
            />
          {/each}
        </section>
      {/each}
    </article>
  {/each}
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
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
  }

  p {
    text-align: center;
    font-size: 1.5rem;
  }

  a {
    font-family: "IBM Plex Mono", monospace;
    color: orangered;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  article {
    display: grid;
    grid-template-columns: min(350px, 25vw) repeat(4, 1fr);
    gap: 2rem;
  }

  .model {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
  }

  .model-name {
    grid-column: span 2;
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.85rem;
    margin: 1.5rem 0;
    color: #aaa;
  }

  .prompt {
    font-size: 2rem;
    margin: 1.5rem 0;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>
