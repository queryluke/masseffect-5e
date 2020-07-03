<template lang="pug">
  img(
    srcset="/images/me5e_logo_450w.png 450w, /images/me5e_logo_600w.png 600w, /images/me5e_logo_720w.png 720w, /images/me5e_logo_900w.png 900w, /images/me5e_logo_1200w.png 1200w"
    sizes="(max-width: 320px) 320px, (max-width: 480px) 480px, (max-width: 600px) 600px, (max-width: 720px) 600px, (max-width: 900px) 720px, (max-width: 1200px) 900px, 1200px"
    src="/images/me5e_logo_1200w.png"
    alt="Mass Effect 5e logo"
  ).mt-5.me-title-logo
</template>

<script>
export default {
  name: 'MeHeaderLogo'
}
</script>
