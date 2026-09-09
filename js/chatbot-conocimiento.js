window.ChatbotConocimiento = (function () {
    const baseConocimiento = [
        {
            patrones: ['hola', 'buenas', 'hey', 'qué tal', 'que tal'],
            respuesta: '¡Hola! ¿En qué te ayudo hoy? Puedo sugerirte rutinas (piernas, brazos, espalda, pecho, abdomen, principiante), hablarte de calorías, proteína, comidas pre y post entreno, hidratación o snacks saludables.'
        },
        {
            patrones: ['rutina principiante', 'empezar', 'nunca he entrenado', 'soy nuevo'],
            respuesta: 'Rutina para principiantes (3 días/semana, cuerpo completo):\n- 3x12 sentadillas\n- 3x10 flexiones (o press de banca)\n- 3x12 remo con banda o mancuerna\n- 3x15 zancadas\n- 3x30seg plancha\nDescansa 48h entre sesiones y sube el peso poco a poco.'
        },
        {
            patrones: ['rutina piernas', 'pierna', 'cuadriceps', 'gluteos'],
            respuesta: 'Rutina de piernas:\n- 4x10 sentadillas\n- 3x12 prensa o zancadas\n- 3x15 peso muerto rumano\n- 3x15 elevación de talones\n- 3x20 puente de glúteo\nDescansa 60-90seg entre series.'
        },
        {
            patrones: ['rutina brazo', 'biceps', 'triceps'],
            respuesta: 'Rutina de brazos:\n- 3x12 curl de bíceps\n- 3x12 extensión de tríceps\n- 3x10 press francés\n- 3x15 curl martillo\n- 3x12 fondos en banco'
        },
        {
            patrones: ['rutina espalda', 'dorsal'],
            respuesta: 'Rutina de espalda:\n- 3x10 dominadas o jalón al pecho\n- 3x12 remo con barra o mancuerna\n- 3x12 remo en polea baja\n- 3x15 hiperextensiones'
        },
        {
            patrones: ['rutina pecho', 'pectoral'],
            respuesta: 'Rutina de pecho:\n- 4x10 press de banca\n- 3x12 press inclinado con mancuernas\n- 3x15 aperturas\n- 3x12 fondos en paralelas'
        },
        {
            patrones: ['rutina abdomen', 'abdominales', 'six pack', 'core'],
            respuesta: 'Rutina de abdomen:\n- 3x20 crunch\n- 3x30seg plancha\n- 3x15 elevación de piernas\n- 3x20 giros rusos\nRecuerda: el abdomen marcado depende más de la alimentación que del ejercicio.'
        },
        {
            patrones: ['perder peso', 'bajar de peso', 'adelgazar', 'quemar grasa'],
            respuesta: 'Para perder peso combina un déficit calórico moderado (300-500 kcal menos de tu gasto diario) con cardio 3-4 veces por semana y entrenamiento de fuerza para no perder músculo. La constancia importa más que la intensidad.'
        },
        {
            patrones: ['ganar musculo', 'masa muscular', 'volumen', 'aumentar musculo'],
            respuesta: 'Para ganar músculo necesitas un ligero superávit calórico (200-300 kcal extra), 1.6-2.2g de proteína por kg de peso al día, y entrenamiento de fuerza progresivo (subir peso o repeticiones poco a poco).'
        },
        {
            patrones: ['cardio', 'correr', 'cardiovascular'],
            respuesta: 'Para cardio: empieza con 20-30 minutos, 3 veces por semana (caminata rápida, bicicleta o trote). Si buscas quemar grasa, el HIIT (intervalos de alta intensidad) es muy eficiente en poco tiempo.'
        },
        {
            patrones: ['caloria', 'kcal'],
            respuesta: 'Un cálculo rápido de mantenimiento: peso (kg) x 30 ≈ calorías diarias aproximadas. Para bajar de peso, resta 300-500; para subir masa, suma 200-300. Esto varía según tu actividad, así que ajústalo según resultados.'
        },
        {
            patrones: ['proteina', 'proteína'],
            respuesta: 'Se recomienda 1.6-2.2g de proteína por kg de peso corporal al día si entrenas fuerza. Nuestra Proteína Whey y los batidos de la tienda son una buena forma de completar esa cantidad, sobre todo después de entrenar.'
        },
        {
            patrones: ['desayuno'],
            respuesta: 'Ideas de desayuno saludable: avena con fruta y proteína, huevos con pan integral y aguacate, o un batido de proteína con banana. Busca incluir proteína + carbohidrato complejo.'
        },
        {
            patrones: ['pre entreno', 'antes de entrenar', 'preentreno'],
            respuesta: 'Antes de entrenar (1-2h antes): carbohidratos de fácil digestión + algo de proteína, por ejemplo banana con un poco de proteína, o pan integral con miel. Evita comidas muy pesadas justo antes.'
        },
        {
            patrones: ['post entreno', 'despues de entrenar', 'postentreno'],
            respuesta: 'Después de entrenar: proteína + carbohidrato dentro de la primera hora ayuda a la recuperación. Un batido de proteína con fruta es una opción rápida y práctica.'
        },
        {
            patrones: ['agua', 'hidratacion', 'hidratación'],
            respuesta: 'Se recomienda tomar al menos 2-3 litros de agua al día, más si entrenas fuerte o hace calor. La hidratación afecta directamente tu rendimiento y recuperación.'
        },
        {
            patrones: ['snack', 'merienda', 'antojo'],
            respuesta: 'Snacks saludables: frutos secos, yogurt griego, barra de proteína, o los Healthy Bites de nuestra tienda. Buena opción entre comidas para no llegar con mucha hambre a la siguiente.'
        },
        {
            patrones: ['dormir', 'descanso', 'sueño'],
            respuesta: 'El descanso es tan importante como el entrenamiento: intenta dormir 7-9 horas por noche. Es cuando tu cuerpo repara el músculo y se recupera de verdad.'
        },
        {
            patrones: ['suplemento', 'creatina', 'bcaa'],
            respuesta: 'Suplementos básicos y respaldados por evidencia: creatina monohidratada (fuerza y rendimiento), proteína en polvo (completar ingesta diaria) y multivitamínico si tu dieta es limitada. Los tenemos disponibles en la tienda.'
        },
        {
            patrones: ['precio', 'cuanto cuesta', 'cuánto cuesta', 'comprar'],
            respuesta: 'Puedes ver todos los precios en nuestro catálogo en la página principal, o escribirnos directo por WhatsApp para más detalles.'
        },
        {
            patrones: ['gracias'],
            respuesta: '¡De nada! Aquí estoy si tienes otra pregunta sobre rutinas o alimentación.'
        },
        {
            patrones: ['adios', 'adiós', 'chao', 'hasta luego'],
            respuesta: '¡Hasta pronto! Sigue entrenando duro.'
        },
        {
            patrones: ['rutina cuerpo completo', 'full body', 'rutina completa'],
            respuesta: 'Rutina de cuerpo completo (ideal 3 veces por semana):\n- 4x10 sentadillas\n- 3x10 press de banca o flexiones\n- 3x10 remo\n- 3x10 press militar\n- 3x12 peso muerto rumano\n- 3x30seg plancha\nDeja al menos un día de descanso entre sesiones.'
        },
        {
            patrones: ['rutina en casa', 'sin equipo', 'sin pesas', 'sin gimnasio'],
            respuesta: 'Rutina en casa sin equipo:\n- 3x15 sentadillas\n- 3x10 flexiones\n- 3x12 zancadas por pierna\n- 3x30seg plancha\n- 3x15 puente de glúteo\n- 3x20 mountain climbers\nUsa el peso de tu cuerpo y controla bien el movimiento.'
        },
        {
            patrones: ['push pull legs', 'push pull', 'rutina avanzada', 'rutina intermedio', 'rutina 5 dias', 'rutina 6 dias'],
            respuesta: 'Rutina Push/Pull/Legs (para intermedios-avanzados, 5-6 días por semana):\n- Push (empuje): pecho, hombro, tríceps\n- Pull (jalón): espalda, bíceps\n- Legs (piernas): cuádriceps, isquios, glúteos\nSe repite el ciclo 2 veces por semana si entrenas 6 días.'
        },
        {
            patrones: ['rutina tonificar', 'tonificar', 'rutina mujer'],
            respuesta: 'Rutina para tonificar (4 días por semana, repeticiones altas 12-15 con peso moderado):\n- Tren inferior: sentadillas, zancadas, puente de glúteo, peso muerto rumano\n- Tren superior: remo, press, curl, extensión de tríceps\n- Core: plancha, elevación de piernas\nCombina con cardio ligero 2-3 veces por semana.'
        },
        {
            patrones: ['calentamiento', 'calentar'],
            respuesta: 'Antes de entrenar, calienta 5-10 minutos: cardio suave (bicicleta, trote ligero) + movilidad articular (rotación de hombros, cadera, tobillos) y series de aproximación con poco peso antes del peso de trabajo. Reduce el riesgo de lesión.'
        },
        {
            patrones: ['estiramiento', 'flexibilidad', 'elongar'],
            respuesta: 'Estira después de entrenar (no antes de fuerza), manteniendo cada posición 20-30 segundos sin rebotar. Mejora la flexibilidad y ayuda a la recuperación. El yoga o pilates también son buenas opciones complementarias.'
        },
        {
            patrones: ['agujetas', 'dolor muscular', 'me duele'],
            respuesta: 'El dolor muscular (agujetas) después de entrenar es normal, sobre todo si cambias de rutina. Ayuda: hidratarte bien, dormir suficiente, estirar suave y mantenerte en movimiento (no reposo total). Si el dolor es agudo, en una articulación, o no mejora en varios días, es mejor consultar a un profesional de salud.'
        },
        {
            patrones: ['lesion', 'lesión', 'me lastime', 'dolor de espalda', 'dolor de rodilla'],
            respuesta: 'No soy un profesional de la salud y no puedo diagnosticar lesiones. Si sientes dolor agudo, hinchazón o algo que no mejora, te recomiendo consultar a un médico o fisioterapeuta antes de seguir entrenando esa zona.'
        },
        {
            patrones: ['carbohidrato', 'carbohidratos', 'carbos'],
            respuesta: 'Los carbohidratos son la principal fuente de energía para entrenar. Prioriza los complejos (avena, arroz integral, camote, quinoa) sobre los azúcares simples, y ajusta la cantidad según tu nivel de actividad.'
        },
        {
            patrones: ['grasa buena', 'grasas', 'grasas saludables'],
            respuesta: 'Las grasas saludables (aguacate, aceite de oliva, frutos secos, pescado azul) son importantes para las hormonas y la salud general. No hay que eliminarlas, solo cuidar la porción dentro de tus calorías totales.'
        },
        {
            patrones: ['fibra'],
            respuesta: 'La fibra (vegetales, frutas, avena, legumbres) ayuda a la digestión y a mantenerte saciado por más tiempo, lo cual es útil si buscas bajar de peso.'
        },
        {
            patrones: ['azucar', 'azúcar'],
            respuesta: 'No es necesario eliminar el azúcar por completo, pero sí moderarla. El exceso de azúcar añadida puede dificultar tanto bajar de peso como mantener energía estable durante el día.'
        },
        {
            patrones: ['ayuno intermitente', 'ayuno'],
            respuesta: 'El ayuno intermitente (por ejemplo 16:8, comiendo en una ventana de 8 horas) puede ayudar a algunas personas a controlar las calorías totales, pero no es obligatorio ni mejor que otros métodos. Lo importante sigue siendo el total de calorías y proteína del día.'
        },
        {
            patrones: ['vegetariano', 'vegano', 'sin carne'],
            respuesta: 'Fuentes de proteína vegetal: legumbres (lentejas, garbanzos, frijoles), tofu, tempeh, quinoa, y proteína vegetal en polvo. Puede requerir combinar varias fuentes en el día para cubrir todos los aminoácidos esenciales.'
        },
        {
            patrones: ['meal prep', 'preparar comida', 'organizar comidas'],
            respuesta: 'Para meal prep: elige 2-3 recetas simples, cocina porciones de proteína (pollo, carne, tofu) y carbohidrato (arroz, papa) por adelantado, y arma tus platos combinando con vegetales frescos cada día. Ahorra tiempo y ayuda a mantener la dieta.'
        },
        {
            patrones: ['alcohol', 'cerveza', 'tomar trago'],
            respuesta: 'El alcohol aporta calorías vacías y puede afectar la recuperación muscular y el sueño. No hace falta eliminarlo del todo, pero con moderación es mejor para tus resultados.'
        },
        {
            patrones: ['cheat day', 'día libre', 'comer libre'],
            respuesta: 'Un día libre ocasional está bien y puede ayudar mentalmente a sostener una dieta a largo plazo, siempre que no se vuelva la norma. Escucha a tu cuerpo y vuelve a tu rutina normal al día siguiente.'
        },
        {
            patrones: ['estancado', 'estancamiento', 'meseta', 'no bajo de peso', 'no avanzo'],
            respuesta: 'Si te estancaste: revisa que sigas en déficit real (a veces las calorías suben sin darse cuenta), varía la rutina cada 4-6 semanas, duerme bien y sé paciente — el progreso no siempre es lineal.'
        },
        {
            patrones: ['motivacion', 'motivación', 'no tengo ganas', 'flojera'],
            respuesta: 'La motivación va y viene, pero el hábito es lo que da resultados. Empieza con sesiones cortas si no tienes ganas, define un horario fijo, y recuerda que la constancia importa más que la perfección.'
        },
        {
            patrones: ['medir progreso', 'medidas', 'balanza', 'peso corporal'],
            respuesta: 'No te guíes solo por la balanza: toma fotos de progreso, mide circunferencias (cintura, brazo, pierna) cada 2-4 semanas, y presta atención a cómo te queda la ropa y tu rendimiento en el gimnasio.'
        },
        {
            patrones: ['omega 3', 'omega3', 'pescado'],
            respuesta: 'El Omega 3 (pescado azul, o en cápsulas) ayuda a la salud cardiovascular y puede apoyar la recuperación. Es un buen complemento si no comes pescado con frecuencia.'
        },
        {
            patrones: ['colageno', 'colágeno'],
            respuesta: 'El colágeno hidrolizado se usa como apoyo para articulaciones, piel y tendones. La evidencia es mixta pero muchas personas lo usan junto con vitamina C para mejor absorción.'
        },
        {
            patrones: ['multivitaminico', 'multivitamínico', 'vitaminas'],
            respuesta: 'Un multivitamínico puede ser útil si tu alimentación es limitada o restrictiva, pero no reemplaza una dieta variada con frutas y vegetales.'
        },
        {
            patrones: ['glutamina'],
            respuesta: 'La glutamina se usa a veces para recuperación y salud digestiva, aunque su efecto extra sobre el crecimiento muscular (si ya comes suficiente proteína) es limitado según la evidencia actual.'
        },
        {
            patrones: ['quemador de grasa', 'termogenico'],
            respuesta: 'Los quemadores de grasa pueden dar un empujón pequeño (energía, algo de supresión del apetito), pero no sustituyen el déficit calórico ni el entrenamiento. Úsalos como complemento, no como solución principal.'
        },
        {
            patrones: ['bajar barriga', 'grasa abdominal', 'marcar abdomen'],
            respuesta: 'No existe la "reducción localizada": no puedes elegir de dónde pierdes grasa primero. Para reducir grasa abdominal necesitas un déficit calórico general, entrenamiento de fuerza y paciencia; el abdomen se define cuando baja el % de grasa corporal general.'
        },
        {
            patrones: ['engordar', 'subir de peso', 'estoy muy flaco', 'ectomorfo'],
            respuesta: 'Si te cuesta subir de peso: aumenta las calorías gradualmente (200-300 extra), prioriza comidas densas en calorías (frutos secos, avena, aceite de oliva, batidos), y entrena fuerza progresiva para que ese peso extra sea principalmente músculo.'
        },
        {
            patrones: ['controlar el hambre', 'mucha hambre', 'ansiedad por comer'],
            respuesta: 'Para controlar el hambre en dieta: prioriza proteína y fibra en cada comida (sacian más), bebe agua antes de comer, y evita pasar muchas horas sin comer nada.'
        },
        {
            patrones: ['entrenar en ayunas', 'ejercicio en ayunas'],
            respuesta: 'Entrenar en ayunas es seguro para la mayoría de las personas en sesiones moderadas, pero si sientes mareo o baja energía, es mejor comer algo ligero antes (por ejemplo una fruta) y ver qué te funciona mejor a ti.'
        },
        {
            patrones: ['frecuencia cardiaca', 'pulsaciones', 'ritmo cardiaco'],
            respuesta: 'Una referencia general de frecuencia cardíaca máxima es 220 menos tu edad. Para quemar grasa se suele entrenar entre 60-70% de esa frecuencia; para mejorar el rendimiento cardiovascular, 70-85%.'
        },
        {
            patrones: ['embarazo', 'embarazada'],
            respuesta: 'Si estás embarazada, cualquier rutina de ejercicio o cambio de dieta debe ser aprobado primero por tu médico, ya que las recomendaciones varían mucho según cada caso.'
        },
        {
            patrones: ['adulto mayor', 'tercera edad', 'persona mayor'],
            respuesta: 'Para adultos mayores se recomienda entrenamiento de fuerza suave (mantiene masa muscular y densidad ósea), ejercicios de equilibrio, y consultar con un médico antes de empezar, sobre todo si hay condiciones previas.'
        },
    ];

    function buscarRespuesta(texto) {
        const t = texto.toLowerCase();
        for (const item of baseConocimiento) {
            if (item.patrones.some((p) => t.includes(p))) {
                return item.respuesta;
            }
        }
        return 'Todavía estoy aprendiendo esa (esto es una versión de muestra). Prueba preguntando sobre rutinas (piernas, brazos, espalda, cuerpo completo, en casa), calorías, proteína, carbohidratos, ayuno intermitente, suplementos o motivación. Para algo específico, escríbenos por WhatsApp.';
    }

    return { buscarRespuesta };
})();
