export const kpiData = [
  { id: '1', label: 'Entraînements', value: '128', change: '+12%', icon: 'dumbbell', color: 'primary' },
  { id: '2', label: 'Calories brûlées', value: '28,400', change: '+8%', icon: 'flame', color: 'accent' },
  { id: '3', label: 'Minutes actives', value: '4,320', change: '+15%', icon: 'clock', color: 'blue' },
  { id: '4', label: 'Série actuelle', value: '12 jours', change: '+3', icon: 'zap', color: 'yellow' },
]

export const weeklySummary = [
  { day: 'Lun', workouts: 1, calories: 320, duration: 45 },
  { day: 'Mar', workouts: 1, calories: 280, duration: 35 },
  { day: 'Mer', workouts: 2, calories: 520, duration: 70 },
  { day: 'Jeu', workouts: 0, calories: 0, duration: 0 },
  { day: 'Ven', workouts: 1, calories: 380, duration: 50 },
  { day: 'Sam', workouts: 1, calories: 410, duration: 55 },
  { day: 'Dim', workouts: 0, calories: 150, duration: 20 },
]

export const monthlyProgress = [
  { month: 'Jan', workouts: 18, calories: 4200, avgDuration: 42 },
  { month: 'Fév', workouts: 22, calories: 5100, avgDuration: 45 },
  { month: 'Mar', workouts: 20, calories: 4800, avgDuration: 44 },
  { month: 'Avr', workouts: 25, calories: 5600, avgDuration: 48 },
  { month: 'Mai', workouts: 28, calories: 6200, avgDuration: 50 },
  { month: 'Juin', workouts: 24, calories: 5300, avgDuration: 46 },
]

export const aiSuggestions = [
  { id: '1', title: 'Optimisation Récupération', description: 'Augmente ton temps de sommeil à 8h pour améliorer la récupération musculaire de 23%.', type: 'tip' },
  { id: '2', title: 'Ajustement Charge Progressive', description: 'Ajoute 2.5kg à ta série de développé couché cette semaine — tu es prêt pour la progression.', type: 'workout' },
  { id: '3', title: 'Déficit Hydrique', description: 'Tu n\'as bu que 1.2L hier. Objectif : 2.5L pour maintenir tes performances.', type: 'warning' },
]

export const chatMessages = [
  { id: '1', role: 'ai', content: 'Salut Alexandre ! Prêt pour ta séance aujourd\'hui ? 💪', timestamp: '09:00' },
  { id: '2', role: 'user', content: 'Oui, j\'ai besoin d\'un programme pour le haut du corps aujourd\'hui.', timestamp: '09:02' },
  { id: '3', role: 'ai', content: 'Parfait ! Je te propose un focus pectoraux/épaules avec finition triceps. Tu disposes de combien de temps ?', timestamp: '09:02' },
  { id: '4', role: 'user', content: '45 minutes environ.', timestamp: '09:03' },
  { id: '5', role: 'ai', content: 'Voici ton programme optimisé :\n\n**1. Développé couché barre** — 4×8-10 reps\n**2. Développé militaire haltères** — 3×10-12 reps\n**3. Écartés incliné haltères** — 3×12 reps\n**4. Oiseau haltère** — 3×12-15 reps\n**5. Extensions triceps poulie** — 3×12 reps\n\nTemps estimé : 42 min. Bon entraînement ! 🔥', timestamp: '09:04' },
  { id: '6', role: 'ai', content: 'N\'oublie pas de t\'hydrater entre chaque série. Je suis là si tu as besoin d\'ajuster quoi que ce soit !', timestamp: '09:05' },
]

export const quickReplies = ['Génère un programme push/pull', 'Conseils pour la prise de masse', 'Analyse ma séance d\'hier', 'Exercice pour les abdominaux']

export const workoutPrograms = [
  { id: '1', name: 'Push / Pull / Legs', type: 'Force Hypertrophie', level: 'Intermédiaire', duration: 60, sessions: 6, calories: 450, exercises: [
    { name: 'Développé couché', sets: 4, reps: '8-10', rest: '90s' }, { name: 'Rowing barre', sets: 4, reps: '8-10', rest: '90s' },
    { name: 'Squat barre', sets: 4, reps: '10-12', rest: '120s' }, { name: 'Développé militaire', sets: 3, reps: '10-12', rest: '60s' },
    { name: 'Tirage horizontal', sets: 3, reps: '12', rest: '60s' }, { name: 'Fentes haltères', sets: 3, reps: '12/j', rest: '60s' },
  ]},
  { id: '2', name: 'Full Body Express', type: 'Full Body', level: 'Débutant', duration: 30, sessions: 4, calories: 280, exercises: [
    { name: 'Goblet squat', sets: 3, reps: '12', rest: '45s' }, { name: 'Pompes', sets: 3, reps: '10-15', rest: '45s' },
    { name: 'Rowing haltère', sets: 3, reps: '12/j', rest: '45s' }, { name: 'Planche', sets: 3, reps: '30-45s', rest: '30s' },
  ]},
  { id: '3', name: 'HIICardio + Core', type: 'Cardio HIIT', level: 'Avancé', duration: 25, sessions: 3, calories: 350, exercises: [
    { name: 'Burpees', sets: 4, reps: '30s', rest: '15s' }, { name: 'Mountain climbers', sets: 4, reps: '30s', rest: '15s' },
    { name: 'Jump squats', sets: 4, reps: '30s', rest: '15s' }, { name: 'Russian twist', sets: 3, reps: '20', rest: '20s' },
    { name: 'Leg raises', sets: 3, reps: '15', rest: '20s' },
  ]},
]

export const trainingExercises = [
  { id: '1', name: 'Développé couché barre', sets: 4, reps: '10', weight: '60kg', completed: false, currentSet: 0 },
  { id: '2', name: 'Développé militaire haltères', sets: 3, reps: '12', weight: '16kg', completed: false, currentSet: 0 },
  { id: '3', name: 'Écartés incliné haltères', sets: 3, reps: '12', weight: '14kg', completed: false, currentSet: 0 },
  { id: '4', name: 'Oiseau haltère', sets: 3, reps: '15', weight: '10kg', completed: false, currentSet: 0 },
  { id: '5', name: 'Extensions triceps poulie', sets: 3, reps: '12', weight: '20kg', completed: false, currentSet: 0 },
]

export const analyticsData = {
  weeklyCalories: [2450, 2100, 2890, 1800, 2600, 3100, 2200],
  weeklyLabels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  monthlyWorkouts: [18, 22, 20, 25, 28, 24, 26, 30, 27, 22, 29, 31],
  monthlyLabels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
  muscleDistribution: [
    { label: 'Pectoraux', value: 22 }, { label: 'Dos', value: 18 }, { label: 'Jambes', value: 25 },
    { label: 'Épaules', value: 15 }, { label: 'Bras', value: 12 }, { label: 'Core', value: 8 },
  ],
  performanceByExercise: [
    { exercise: 'Développé couché', start: 52, current: 68, target: 80 },
    { exercise: 'Squat', start: 60, current: 85, target: 100 },
    { exercise: 'Soulevé de terre', start: 80, current: 110, target: 130 },
    { exercise: 'Rowing barre', start: 45, current: 60, target: 75 },
    { exercise: 'Développé militaire', start: 30, current: 40, target: 50 },
  ],
  bodyStats: [
    { month: 'Jan', weight: 82, muscle: 38, fat: 18 }, { month: 'Fév', weight: 81, muscle: 38.5, fat: 17.5 },
    { month: 'Mar', weight: 80.5, muscle: 39, fat: 17 }, { month: 'Avr', weight: 79.5, muscle: 39.5, fat: 16.2 },
    { month: 'Mai', weight: 79, muscle: 40, fat: 15.8 }, { month: 'Juin', weight: 78.5, muscle: 40.5, fat: 15.5 },
  ],
}

export const notifications = [
  { id: '1', title: 'Séance terminée 🎉', message: 'Bravo ! Tu as complété ta séance Push/Pull/Legs.', time: 'Il y a 2h', read: false },
  { id: '2', title: 'Nouveau record 💪', message: 'Tu as battu ton record au développé couché : 68kg !', time: 'Il y a 1j', read: false },
  { id: '3', title: 'Rappel d\'entraînement', message: 'N\'oublie pas ta séance aujourd\'hui à 18h.', time: 'Il y a 3j', read: true },
  { id: '4', title: 'Conseil IA', message: 'Augmente ton apport en protéines à 160g/jour.', time: 'Il y a 5j', read: true },
]

export const adminNotifications = [
  { id: 'a1', title: 'Nouveau ticket support', message: 'Client Marc D. a besoin d\'aide pour le module IA.', time: 'Il y a 30min', read: false },
  { id: 'a2', title: 'Contenu signalé', message: 'Un programme inapproprié a été signalé par un utilisateur.', time: 'Il y a 2h', read: false },
  { id: 'a3', title: 'Mise à jour effectuée', message: 'La version 2.4.1 a été déployée avec succès.', time: 'Il y a 1j', read: true },
  { id: 'a4', title: 'Rapport hebdomadaire', message: '12 nouveaux utilisateurs cette semaine.', time: 'Il y a 2j', read: true },
]

export const superAdminNotifications = [
  { id: 's1', title: 'Nouvel admin requis', message: '3 demandes de création de compte administrateur en attente.', time: 'Il y a 15min', read: false },
  { id: 's2', title: 'Santé du système', message: 'Temps de réponse API : 42ms. Tout est nominal.', time: 'Il y a 1h', read: false },
  { id: 's3', title: 'Rapport mensuel', message: '324 nouveaux utilisateurs ce mois-ci. Revenus : +23%.', time: 'Il y a 2j', read: true },
  { id: 's4', title: 'Audit de sécurité', message: 'Aucune anomalie détectée. Prochain audit dans 14 jours.', time: 'Il y a 3j', read: true },
]

export const features = [
  { id: '1', icon: 'brain', title: 'Coach IA Personnel', description: 'Un coach intelligent qui s\'adapte à ton niveau, tes objectifs et ta progression en temps réel.' },
  { id: '2', icon: 'dumbbell', title: 'Générateur de Séances', description: 'Crée des programmes d\'entraînement sur mesure en quelques clics.' },
  { id: '3', icon: 'chart', title: 'Analytiques Avancées', description: 'Visualise ta progression avec des graphiques détaillés.' },
  { id: '4', icon: 'timer', title: 'Chronomètre Intelligent', description: 'Timer intégré avec repos automatique et tracking des séries.' },
  { id: '5', icon: 'users', title: 'Plans Collaboratifs', description: 'Partage tes programmes avec ton coach.' },
  { id: '6', icon: 'target', title: 'Objectifs & Défis', description: 'Définis des objectifs SMART et relève des défis.' },
]

export const pricingPlans = [
  { id: 'starter', name: 'Starter', price: 'Gratuit', period: '', description: 'Pour découvrir FitAI', features: ['3 séances générées/mois', 'Coach IA basique', 'Suivi calories', 'Timer de base'], cta: 'Commencer gratuitement', popular: false },
  { id: 'pro', name: 'Pro', price: '14,99 €', period: '/mois', description: 'Pour les sportifs réguliers', features: ['Séances illimitées', 'Coach IA avancé', 'Analytiques complètes', 'Chronomètre pro', 'Plans collaboratifs', 'Export PDF'], cta: 'Essayer 14 jours gratuits', popular: true },
  { id: 'elite', name: 'Elite', price: '29,99 €', period: '/mois', description: 'Pour les athlètes exigeants', features: ['Tout du plan Pro', 'Coach IA VIP', 'Programmes personnalisés', 'API d\'export', 'Support prioritaire', 'Défis communautaires'], cta: 'Devenir Elite', popular: false },
]

export const testimonials = [
  { id: '1', name: 'Sophie L.', role: 'Crossfit, 28 ans', avatar: 'SL', content: 'FitAI a transformé ma façon de m\'entraîner.' },
  { id: '2', name: 'Marc D.', role: 'Musculation, 34 ans', avatar: 'MD', content: 'Le coach IA est bluffant. Résultats incroyables.' },
  { id: '3', name: 'Julie K.', role: 'Running & HIIT, 25 ans', avatar: 'JK', content: 'Les analytiques me permettent de voir ma progression exacte.' },
]

export const mockUsers = [
  { id: 'u1', name: 'Marc Dupont', email: 'marc@email.com', role: 'client', plan: 'Pro', workouts: 42, joinDate: '2025-10-15', status: 'active' },
  { id: 'u2', name: 'Julie Moreau', email: 'julie@email.com', role: 'client', plan: 'Starter', workouts: 18, joinDate: '2025-11-01', status: 'active' },
  { id: 'u3', name: 'Lucas Petit', email: 'lucas@email.com', role: 'client', plan: 'Elite', workouts: 87, joinDate: '2025-08-20', status: 'active' },
  { id: 'u4', name: 'Emma Bernard', email: 'emma@email.com', role: 'client', plan: 'Pro', workouts: 63, joinDate: '2025-09-10', status: 'active' },
  { id: 'u5', name: 'Hugo Roux', email: 'hugo@email.com', role: 'client', plan: 'Starter', workouts: 5, joinDate: '2026-01-05', status: 'suspended' },
  { id: 'u6', name: 'Camille Leroy', email: 'camille@email.com', role: 'client', plan: 'Elite', workouts: 124, joinDate: '2025-06-01', status: 'active' },
  { id: 'u7', name: 'Nicolas Fournier', email: 'nicolas@email.com', role: 'client', plan: 'Pro', workouts: 0, joinDate: '2026-02-20', status: 'pending' },
  { id: 'u8', name: 'Sarah Morel', email: 'sarah@email.com', role: 'client', plan: 'Starter', workouts: 12, joinDate: '2025-12-01', status: 'active' },
]

export const mockAdmins = [
  { id: 'a1', name: 'Sophie Laurent', email: 'admin@fitai.com', role: 'admin', created: '2024-03-01', lastActive: '2026-05-10', status: 'active', tickets: 89 },
  { id: 'a2', name: 'Romain Girard', email: 'romain.g@fitai.com', role: 'admin', created: '2024-06-15', lastActive: '2026-05-09', status: 'active', tickets: 134 },
  { id: 'a3', name: 'Léa Muller', email: 'lea.m@fitai.com', role: 'admin', created: '2024-09-01', lastActive: '2026-05-08', status: 'active', tickets: 62 },
  { id: 'a4', name: 'Antoine Petit', email: 'antoine.p@fitai.com', role: 'admin', created: '2025-01-10', lastActive: '2026-04-28', status: 'inactive', tickets: 45 },
]

export const supportTickets = [
  { id: 't1', subject: 'Impossible de générer un programme', user: 'Marc D.', status: 'open', priority: 'high', date: '2026-05-10', messages: 4 },
  { id: 't2', subject: 'Bug sur le chronomètre', user: 'Julie M.', status: 'in_progress', priority: 'medium', date: '2026-05-09', messages: 6 },
  { id: 't3', subject: 'Question sur l\'abonnement Elite', user: 'Lucas P.', status: 'open', priority: 'low', date: '2026-05-08', messages: 2 },
  { id: 't4', subject: 'Données d\'analytiques incorrectes', user: 'Emma B.', status: 'resolved', priority: 'high', date: '2026-05-07', messages: 8 },
  { id: 't5', subject: 'Problème de connexion', user: 'Hugo R.', status: 'closed', priority: 'medium', date: '2026-05-05', messages: 3 },
  { id: 't6', subject: 'Demande de fonctionnalité : mode sombre', user: 'Camille L.', status: 'in_progress', priority: 'low', date: '2026-05-04', messages: 5 },
]

export const systemHealth = {
  status: 'healthy',
  uptime: '99.97%',
  apiLatency: '42ms',
  activeUsers: 847,
  totalUsers: 12843,
  dailyActiveUsers: 3421,
  servers: [
    { name: 'API Production', status: 'operational', latency: '38ms', load: '42%' },
    { name: 'API Staging', status: 'operational', latency: '45ms', load: '12%' },
    { name: 'Database Primary', status: 'operational', latency: '12ms', load: '56%' },
    { name: 'Database Replica', status: 'operational', latency: '14ms', load: '34%' },
    { name: 'Cache (Redis)', status: 'operational', latency: '2ms', load: '28%' },
    { name: 'AI Inference', status: 'degraded', latency: '890ms', load: '72%' },
    { name: 'Storage (CDN)', status: 'operational', latency: '85ms', load: '18%' },
  ],
  recentEvents: [
    { time: '2026-05-10 14:32', type: 'deploy', message: 'Déploiement v2.4.1 terminé' },
    { time: '2026-05-10 09:15', type: 'warning', message: 'Latence IA > 800ms détectée' },
    { time: '2026-05-09 22:00', type: 'maintenance', message: 'Maintenance base de données planifiée' },
    { time: '2026-05-08 16:45', type: 'info', message: '324 nouveaux utilisateurs cette semaine' },
    { time: '2026-05-07 11:20', type: 'deploy', message: 'Mise à jour de sécurité appliquée' },
  ],
}

export const aiLogs = [
  { id: 'l1', user: 'Marc D.', action: 'generation_workout', model: 'fitai-llm-v2', tokens: 342, latency: '1.2s', timestamp: '2026-05-10 14:30:22', status: 'success' },
  { id: 'l2', user: 'Julie M.', action: 'chat_message', model: 'fitai-llm-v2', tokens: 156, latency: '0.8s', timestamp: '2026-05-10 14:28:15', status: 'success' },
  { id: 'l3', user: 'Lucas P.', action: 'suggestion_analyze', model: 'fitai-llm-v2', tokens: 523, latency: '2.1s', timestamp: '2026-05-10 14:25:00', status: 'success' },
  { id: 'l4', user: 'Emma B.', action: 'workout_generation', model: 'fitai-llm-v2', tokens: 289, latency: '1.5s', timestamp: '2026-05-10 14:20:33', status: 'success' },
  { id: 'l5', user: 'System', action: 'batch_analytics', model: 'fitai-analytics-v1', tokens: 1500, latency: '4.8s', timestamp: '2026-05-10 14:15:00', status: 'success' },
  { id: 'l6', user: 'Hugo R.', action: 'chat_message', model: 'fitai-llm-v2', tokens: 89, latency: '3.4s', timestamp: '2026-05-10 14:10:45', status: 'warning' },
  { id: 'l7', user: 'Camille L.', action: 'workout_generation', model: 'fitai-llm-v2', tokens: 412, latency: '0.9s', timestamp: '2026-05-10 14:05:12', status: 'success' },
  { id: 'l8', user: 'System', action: 'model_update', model: 'fitai-llm-v2', tokens: 0, latency: '0s', timestamp: '2026-05-10 14:00:00', status: 'info' },
]

export const platformKpis = [
  { id: 'p1', label: 'Utilisateurs actifs', value: '3,421', change: '+12%', icon: 'users', color: 'primary' },
  { id: 'p2', label: 'Revenus mensuels', value: '48,290 €', change: '+23%', icon: 'flame', color: 'accent' },
  { id: 'p3', label: 'Taux de rétention', value: '87%', change: '+5%', icon: 'chart', color: 'blue' },
  { id: 'p4', label: 'Requêtes IA/jour', value: '12,847', change: '+18%', icon: 'brain', color: 'yellow' },
]
