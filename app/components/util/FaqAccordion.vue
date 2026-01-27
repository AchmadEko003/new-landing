<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4 text-gray-800">
        {{ title }}
      </h2>
      <p class="text-xl text-gray-600">
        {{ subtitle }}
      </p>
    </div>

    <UAccordion
      :items="accordionItems"
      class="bg-white rounded-lg shadow-none border border-gray-200 overflow-hidden"
      :ui="{
        trailingIcon: 'pr-10'
      }"
      size="lg"
    >
      <template #default="{ item }">
        <UButton
          color="neutral"
          variant="ghost"
          class="w-full justify-between text-left hover:bg-gray-50 rounded-none transition-colors"
          :ui="{
            base: 'justify-between'
          }"
        >
          <span class="text-lg font-semibold text-gray-900">{{ item.label }}</span>
        </UButton>
      </template>

      <template #content="{ item }">
        <div class="px-6 pb-6 text-gray-700 leading-relaxed faq-content">
          <div v-html="sanitizeHtml(item.content)" />
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup lang="ts">
import type { IFaq } from '~~/shared/interface/IFaq'

interface Props {
  faqData?: IFaq[]
  title?: string
  subtitle?: string
}

const { sanitizeHtml } = useSanitize()

const props = withDefaults(defineProps<Props>(), {
  faqData: () => [],
  title: 'Pertanyaan Sering Diajukan',
  subtitle: 'Temukan jawaban untuk pertanyaan umum'
})

const accordionItems = computed(() => {
  return props.faqData.map(faq => ({
    label: faq.name,
    content: faq.content
  }))
})
</script>

<style scoped>
.faq-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.faq-content :deep(table thead) {
  background-color: #f3f4f6;
}

.faq-content :deep(table th) {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  font-weight: 600;
  text-align: left;
  background-color: #f3f4f6;
}

.faq-content :deep(table td) {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
}

.faq-content :deep(table tbody tr:hover) {
  background-color: #f9fafb;
}

.faq-content :deep(h1),
.faq-content :deep(h2),
.faq-content :deep(h3),
.faq-content :deep(h4),
.faq-content :deep(h5),
.faq-content :deep(h6) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.faq-content :deep(p) {
  margin-bottom: 1rem;
}

.faq-content :deep(ul),
.faq-content :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.faq-content :deep(a) {
  color: #0070f3;
  text-decoration: underline;
}

.faq-content :deep(a:hover) {
  text-decoration: none;
}
</style>
