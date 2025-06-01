<script setup lang="ts">
import { tokens } from '../../locales/tokens'
import { useI18n } from 'vue-i18n'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { Motion } from 'motion-v'
import SectionTitle from '../SectionTitle.vue'

const { t } = useI18n()
const isMobile = ref(false)

const layoutKey = ref(0)

const checkScreenSize = () => {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth <= 900
  
  if (wasMobile !== isMobile.value) {
    layoutKey.value++
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

type TimelinePhase = keyof typeof tokens.timeline.items

const timelinePhases: TimelinePhase[] = [
    'engineering',
    'resources',
    'realEstate',
    'sales',
    'systems'
]

const sortedTimelinePhases = computed(() => {
    return [...timelinePhases].sort((a, b) => {
        const yearA = Number(t(tokens.timeline.items[a].year))
        const yearB = Number(t(tokens.timeline.items[b].year))
        return yearA - yearB
    })
})

const getInitialAnimation = (idx: number) => {
  if (isMobile.value) {
    return { opacity: 0, x: 80 }
  } else {
    return idx % 2 === 0 
      ? { opacity: 0, x: -80 } 
      : { opacity: 0, x: 80 }
  }
}
</script>

<template>
    <section class="timeline-section">
        <SectionTitle :title="t(tokens.timeline.title)" />
        <div class="timeline-container">
            <div class="timeline-bar"></div>
            <ul class="timeline-list">
                <li v-for="(phase, idx) in sortedTimelinePhases" 
                    :key="`${phase}-${layoutKey}`"
                    :class="['timeline-item', idx % 2 === 0 ? 'left' : 'right']">

                    <Motion 
                      as="span"
                      class="timeline-dot" 
                      :class="{ rightDot: idx % 2 === 1 }"
                      :style="{ top: 'calc(50% - 12px)' }"
                      :initial="{ opacity: 0, scale: 0 }"
                      :while-in-view="{ opacity: 1, scale: 1 }"
                      :viewport="{ once: true, amount: 0.6 }"
                      :transition="{ duration: 0.4, delay: idx * 0.18 }"
                    />

                    <Motion 
                      as="div"
                      class="timeline-content"
                      :initial="getInitialAnimation(idx)"
                      :while-in-view="{ opacity: 1, x: 0 }"
                      :viewport="{ once: true, amount: 0.6 }"
                      :transition="{ duration: 0.7, delay: idx * 0.18 }"
                    >
                        <span class="ano">{{ t(tokens.timeline.items[phase].year) }}</span>
                        <h3>{{ t(tokens.timeline.items[phase].title) }}</h3>
                        <p>{{ t(tokens.timeline.items[phase].desc) }}</p>
                    </Motion>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.timeline-section {
    margin: 3rem auto;
    padding: 2.5rem 1rem;
    background: var(--background-section);
    border-radius: var(--border-radius);
    max-width: 900px;
    position: relative;
}

.timeline-container {
    position: relative;
    width: 100%;
    min-height: 400px;
    margin-top: 2rem;
}

.timeline-bar {
    position: absolute;
    left: 50%;
    top: 0;
    width: 3px;
    height: 100%;
    background: var(--primary-color);
    transform: translateX(-50%);
    z-index: 1;
    border-radius: 2px;
}

.timeline-list {
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
}

.timeline-item {
    position: relative;
    width: 50%;
    padding: 1.2rem 0;
    box-sizing: border-box;
    min-height: 120px;
    display: flex;
    align-items: center;
}

.timeline-item.left {
    left: 0;
    text-align: right;
    justify-content: flex-start;
    flex-direction: row-reverse;
    display: flex;
}

.timeline-item.right {
    left: 50%;
    text-align: left;
    justify-content: flex-start;
    flex-direction: row;
}

.timeline-content {
    background: #fff;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: 1.25rem 1.5rem;
    min-width: 200px;
    max-width: 320px;
    position: relative;
    z-index: 2;
    display: inline-block;
    margin: 0 1.5rem;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.timeline-content:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.timeline-dot {
    position: absolute;
    left: 98%;
    width: 20px;
    height: 20px;
    background: #fff;
    border: 4px solid var(--primary-color);
    border-radius: 50%;
    z-index: 3;
    box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.15);
    transform: translate(-50%, 0);
    transition: box-shadow 0.3s ease;
}

.timeline-dot:hover {
    box-shadow: 0 0 0 8px rgba(66, 185, 131, 0.2);
}

.timeline-dot.rightDot {
    left: -10px;
    transform: translate(-50%, 0);
}

.timeline-item.left .timeline-content {
    margin-right: 1.5rem;
    margin-left: 0;
}

.timeline-item.right .timeline-content {
    margin-left: 1.5rem;
    margin-right: 0;
}

.ano {
    display: block;
    font-weight: 700;
    color: var(--primary-color);
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.timeline-content h3 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--text-color);
}

.timeline-content p {
    margin: 0;
    color: var(--subtitle-color);
    font-size: 0.95rem;
    line-height: 1.5;
}

@media (max-width: 900px) {
    .timeline-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 1rem;
    }
    
    .timeline-list {
        width: max-content;
    }

    .timeline-container {
        width: max-content;
        margin-top: 2rem;
    }

    .timeline-item,
    .timeline-item.left,
    .timeline-item.right {
        width: max-content;
        left: 0;
        text-align: left;
        justify-content: flex-start;
        flex-direction: row;
    }

    .timeline-bar {
        left: 20px;
        transform: none;
    }

    .timeline-item.left .timeline-content,
    .timeline-item.right .timeline-content {
        margin: 0 0 2rem 2.5rem;
        margin-left: 2.2rem;
    }

    .timeline-dot {
        left: 10px;
        transform: translateY(0);
    }

    .timeline-dot.rightDot {
        left: 10px;
        transform: translateY(0);
    }
}
</style>
