<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { tokens } from '../locales/tokens'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img alt="Sagat logo" class="logo" src="../assets/sagat-icon.png" height="60" />
        <p class="company-name">SAGAT AI</p>
      </div>
      
      <div class="footer-links">
        <div class="footer-column">
          <h3>{{ t(tokens.footer.company) }}</h3>
          <ul>
            <li><a href="#">{{ t(tokens.footer.about) }}</a></li>
            <li><a href="#">{{ t(tokens.footer.services) }}</a></li>
            <li><a href="#">{{ t(tokens.footer.projects) }}</a></li>
            <li><a href="#">{{ t(tokens.footer.careers) }}</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>{{ t(tokens.footer.resources) }}</h3>
          <ul>
            <li><a href="#">{{ t(tokens.footer.blog) }}</a></li>
            <li><a href="#">{{ t(tokens.footer.documentation) }}</a></li>
            <li><a href="#">{{ t(tokens.footer.faq) }}</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>{{ t(tokens.footer.contact) }}</h3>
          <ul>
            <li class="contact-item">
              <span class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                </svg>
              </span>
              <div>
                <p>R. Vítor Janjacomo, 862 - Parque Industrial</p>
                <p>Penápolis, SP - 16300-000</p>
              </div>
            </li>
            <li class="contact-item">
              <span class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                </svg>
              </span>
              <a href="tel:+551836522228">+55 (18) 3652-2228</a>
            </li>
            <li class="contact-item">
              <span class="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              </span>
              <a href="mailto:comercial@sagatengenharia.com.br">comercial@sagatengenharia.com.br</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">&copy; {{ currentYear }} SAGAT AI. {{ t(tokens.footer.allRightsReserved) }}</p>
      <div class="social-links">
        <a href="https://www.linkedin.com/company/sagat-engenharia/" target="_blank" class="social-link" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a href="https://www.facebook.com/sagatengenharia" target="_blank" class="social-link" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/sagatengenharia/" target="_blank" class="social-link" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://www.youtube.com/@sagatengenharia4007" target="_blank" class="social-link" aria-label="YouTube">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f9fa;
  color: var(--text-color);
  padding: 4rem 2rem 2rem;
  margin-top: 5rem;
  border-top: 1px solid #e9ecef;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 3rem;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 250px;
}

.company-name {
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
}

.footer-column {
  min-width: 160px;
}

.footer-column h3 {
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
  color: var(--text-color);
  position: relative;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: var(--primary-color);
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 0.7rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 1rem;
}

.contact-icon {
  font-size: 1rem;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--subtitle-color);
}

.contact-item p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--subtitle-color);
  line-height: 1.4;
}

.footer-column a {
  color: var(--subtitle-color);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.95rem;
}

.footer-column a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: var(--subtitle-color);
  font-size: 0.9rem;
  margin: 0;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #edf2f7;
  color: var(--subtitle-color);
  transition: all 0.2s ease;
}

.social-link:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
