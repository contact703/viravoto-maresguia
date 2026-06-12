/**
 * vIrAvoto — IA da Campanha de João Batista Mares Guia
 * Deputado Federal · Minas Gerais · 2026 · PT
 * Versão 1.0 — Processamento local inteligente (sem dependência de API externa)
 *
 * Tom de voz: cordial, sereno e convicto. Reflexivo e popular sem ser vulgar.
 * Humilde e firme. Histórico e propositivo. Nunca agressivo ou panfletário.
 * Responde com base em fatos e na experiência real do candidato — nunca inventa.
 */

const ChatBot = {
    config: {
        maxHistory: 10
    },

    state: {
        isOpen: false,
        isTyping: false,
        messageCount: 0,
        history: [],
        context: { lastTopic: null }
    },

    // ====== BASE DE CONHECIMENTO ======
    knowledge: {
        candidato: {
            nome: "João Batista Mares Guia",
            nomeCompleto: "João Batista dos Mares Guia",
            nascimento: "Santa Bárbara, Minas Gerais, em 25 de junho de 1948",
            idade: "77 anos",
            profissao: "Sociólogo, professor, gestor público e intelectual",
            formacao: "Sociologia pela UFMG",
            partido: "Partido dos Trabalhadores (PT)",
            numero: "13",
            cargo: "Pré-candidato a Deputado Federal por Minas Gerais",
            slogan: "Uma vida de luta. Uma vida de verdade.",
            frase: "Nada a temer senão o correr da luta.",
            lema: "O que aprendi, devo ao povo. O que faço, faço pelo povo.",
            posicionamento: "Progressista de trajetória, não de discurso — a posição dele não foi construída para a eleição, é o resultado natural de quem viveu o que defende.",
            slogans: [
                "Uma vida de luta. Uma vida de verdade.",
                "Um professor no Congresso.",
                "De Minas, para o Brasil.",
                "Experiência que serve, coragem que persiste."
            ],
            trajetoria: [
                { ano: "1967–68", fato: "Líder estudantil universitário em Minas Gerais" },
                { ano: "1968", fato: "Preso político ao liderar a ocupação da Faculdade de Medicina da UFMG contra a ditadura militar" },
                { ano: "1968", fato: "Preso no 30º Congresso da UNE, em Ibiúna, junto de mais de 900 líderes estudantis" },
                { ano: "1969–72", fato: "Exilado no Chile — trabalhou na reforma agrária do governo Salvador Allende" },
                { ano: "1972", fato: "Retornou ao Brasil e integrou-se à Guerrilha do Araguaia" },
                { ano: "1979", fato: "Premiado com o Vladimir Herzog de Anistia e Direitos Humanos" },
                { ano: "1983–87", fato: "1º Deputado Estadual do PT em Minas Gerais" },
                { ano: "1984", fato: "Coordenou a campanha das Diretas Já em MG, a convite de Tancredo Neves e Lula" },
                { ano: "1988", fato: "Um dos fundadores do PSDB em Minas Gerais" },
                { ano: "1989–94", fato: "Secretário Municipal de Educação, Desenvolvimento Urbano e Meio Ambiente em Contagem" },
                { ano: "1995–98", fato: "Secretário de Educação de MG — o estado ficou em 1º lugar nacional em qualidade de ensino em 1997" },
                { ano: "2000s", fato: "Consultor da Fundação Roberto Marinho e do Banco Mundial" },
                { ano: "2024", fato: "Retornou ao PT a convite pessoal do presidente Lula" },
                { ano: "2026", fato: "Pré-candidato a Deputado Federal por Minas Gerais" }
            ],
            diferenciais: [
                "Biografia como argumento — cada proposta tem um fato vivido por trás",
                "Coerência de 57 anos: desde 1968, os mesmos valores, sem virada por conveniência",
                "Resultado concreto em educação: Minas em 1º lugar nacional em 1997",
                "Relação histórica com Lula, desde as Diretas Já de 1984",
                "Autor do livro 'Coleção Brasil e Democracia'",
                "Experiência internacional: reforma agrária com Allende e consultoria no Banco Mundial",
                "Um professor que foi à política — não um político que dá aulas"
            ],
            valores: [
                { nome: "Verdade", desc: "Uma busca perpétua, um caminho que se percorre a vida inteira." },
                { nome: "Justiça", desc: "Garantir às próximas gerações os benefícios que temos hoje; fazer com que quem não vive bem possa viver bem." },
                { nome: "Democracia", desc: "Um valor universal, não uma pauta de partido. Ele pagou por ela com prisão e exílio." },
                { nome: "Humanismo", desc: "O ser humano no centro de todas as decisões políticas." },
                { nome: "Gratidão e dever", desc: "Devolver à sociedade tudo o que ela proporcionou. A candidatura como missão, não ambição." },
                { nome: "Respeito ao divergente", desc: "Não luta para impor ideias. Respeita quem pensa diferente." }
            ]
        },

        narrativa: {
            ato1: "Resistiu à ditadura na juventude. Foi preso, exilado, perseguido. Não recuou. Lutou com o corpo e com as ideias por um Brasil democrático. Como ele diz: conheço o preço da democracia, paguei por ela.",
            ato2: "Dedicou 35 anos à educação pública. Como secretário, levou Minas ao 1º lugar nacional. Formou gerações, criou programas, transformou escolas em oportunidades. Ele não promete educação — já a transformou.",
            ato3: "Aos 77 anos, a convite de Lula, voltou à política com um único propósito: devolver à sociedade tudo o que ela lhe proporcionou. Não é ambição, é dever.",
            sintese: "Uma vida de luta pela democracia. Uma vida de trabalho pela educação. Uma dívida com o povo de Minas que só o Congresso pode pagar."
        },

        // Eixos temáticos em ordem de prioridade (do racional estratégico)
        eixos: {
            educacao: {
                titulo: "Educação Pública",
                resumo: "A pauta central e o maior diferencial. João Batista tem resultados concretos, não promessas.",
                pontos: [
                    "Foi Secretário de Educação de MG e levou o estado ao 1º lugar nacional em qualidade de ensino, em 1997",
                    "35 anos dedicados à educação pública: professor, gestor e formulador de políticas",
                    "Defende valorização do professor, escola pública forte e oportunidade real para a juventude",
                    "Quer levar ao Brasil o que já fez por Minas"
                ]
            },
            democracia: {
                titulo: "Democracia",
                resumo: "Um valor vivido na pele — prisão, exílio, resistência. Não é discurso, é biografia.",
                pontos: [
                    "Preso político em 1968 por resistir à ditadura militar",
                    "Exilado no Chile e perseguido — pagou pessoalmente pela democracia",
                    "Coordenou as Diretas Já em Minas, em 1984",
                    "Defende a democracia como princípio inegociável, especialmente no contexto pós-2022"
                ]
            },
            justica: {
                titulo: "Justiça Social",
                resumo: "O fio condutor de toda a trajetória — da reforma agrária às políticas de educação.",
                pontos: [
                    "Garantir que quem não vive bem possa viver bem",
                    "Reduzir desigualdades com políticas públicas que ele já ajudou a construir",
                    "O humanismo como padrão moral: o ser humano no centro das decisões"
                ]
            },
            reformaAgraria: {
                titulo: "Reforma Agrária e Agricultura Familiar",
                resumo: "Experiência única e relevante para o interior de Minas.",
                pontos: [
                    "Trabalhou na reforma agrária do governo Salvador Allende, no Chile",
                    "Foi assessor de Reforma Agrária do governo de Minas Gerais",
                    "Defende o apoio à agricultura familiar e ao homem do campo"
                ]
            },
            direitosHumanos: {
                titulo: "Direitos Humanos",
                resumo: "Parte da identidade do candidato — não precisa ser construída.",
                pontos: [
                    "Premiado com o Vladimir Herzog de Anistia e Direitos Humanos, em 1979",
                    "Preso político e perseguido pela ditadura",
                    "Defesa intransigente das liberdades e da dignidade humana"
                ]
            },
            meioAmbiente: {
                titulo: "Meio Ambiente e Desenvolvimento Urbano",
                resumo: "Experiência concreta de gestão.",
                pontos: [
                    "Foi Secretário de Desenvolvimento Urbano e Meio Ambiente em Contagem",
                    "Defende o desenvolvimento sustentável com responsabilidade social"
                ]
            },
            juventude: {
                titulo: "Juventude e Movimentos Sociais",
                resumo: "Foi líder estudantil — sabe falar com os jovens e conectar gerações.",
                pontos: [
                    "Líder do movimento estudantil mineiro nos anos 1960",
                    "História que conecta a luta de ontem com os desafios de hoje",
                    "Acredita na juventude como força de transformação"
                ]
            }
        },

        // Perguntas e respostas oficiais do racional estratégico
        faq: {
            porQue: "João Batista sente o dever de devolver à sociedade tudo o que ela lhe proporcionou. Depois de 21 anos lutando pela democracia e 35 anos trabalhando pela educação, ele voltou à política a convite do presidente Lula — para levar essa experiência ao Congresso.",
            principal: "Educação pública de qualidade para todos. Ele foi Secretário de Educação de Minas e levou o estado ao 1º lugar nacional. Quer fazer pelo Brasil o que já fez por Minas.",
            diferencial: "Uma vida inteira coerente com o que defende. Não são promessas — são fatos verificáveis. Foi preso por democracia, trabalhou pela educação e nunca mudou de valores por conveniência.",
            lula: "Uma amizade histórica. Eles trabalharam juntos nas Diretas Já, em 1984. Foi o próprio Lula quem o convidou, pessoalmente, para retornar ao PT e se candidatar em 2026.",
            democracia: "Para João Batista, a democracia é um valor universal — não uma pauta de partido. Ele pagou por ela com prisão e exílio na juventude, e a defende como princípio inegociável de vida."
        }
    },

    // ====== INTENÇÕES ======
    intents: [
        {
            patterns: ['oi', 'ola', 'opa', 'eae', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'hi', 'tudo bem'],
            action: (ctx) => {
                if (!ctx || ctx.state.messageCount === 0) {
                    return `Olá! 👋 Eu sou o **vIrAvoto**, assistente virtual da campanha de **João Batista Mares Guia**, pré-candidato a Deputado Federal por Minas Gerais.

Posso conversar com você sobre:
• 👤 A trajetória de João Batista
• 📋 Suas propostas e bandeiras
• 🤝 Seus valores e posições
• 🗳️ Sua relação com o PT e com Lula

*Minhas respostas têm base na história real do candidato.*

Sobre o que você gostaria de saber?`;
                }
                return `Olá de novo! Em que mais posso ajudar?`;
            }
        },

        {
            patterns: ['quem e', 'quem é', 'conte sobre', 'fale do candidato', 'fale dele', 'me fale dele', 'quem e ele', 'sobre joao', 'sobre joão', 'biografia', 'mares guia', 'joao batista'],
            action: () => {
                const c = ChatBot.knowledge.candidato;
                return `**${c.nomeCompleto}** nasceu em ${c.nascimento}. É ${c.profissao.toLowerCase()}, com uma das trajetórias mais coerentes e consistentes da política brasileira — uma vida inteira alinhada aos mesmos valores.

📍 Formado em ${c.formacao}
🏛️ ${c.partido} — pré-candidato a Deputado Federal por Minas
📚 Autor do livro "Coleção Brasil e Democracia"

Ele resistiu à ditadura, dedicou 35 anos à educação pública e, aos ${c.idade}, voltou à política a convite do presidente Lula. Não por ambição — por dever.

*"${ChatBot.knowledge.narrativa.sintese}"*`;
            }
        },

        {
            patterns: ['historia', 'história', 'trajetoria', 'trajetória', 'origem', 'onde nasceu', 'linha do tempo', 'como comecou', 'passado', 'vida'],
            action: () => {
                const c = ChatBot.knowledge.candidato;
                const linha = c.trajetoria.map(t => `• **${t.ano}** — ${t.fato}`).join('\n');
                return `**A trajetória de João Batista Mares Guia:**

${linha}

São 57 anos de coerência — desde 1968 até hoje, os mesmos valores. *"${c.frase}"*`;
            }
        },

        {
            patterns: ['propostas', 'plano', 'bandeiras', 'o que vai fazer', 'promessas', 'ideias', 'pautas', 'eixos', 'temas'],
            action: () => {
                return `**As bandeiras prioritárias de João Batista**, em ordem de prioridade:

📚 **Educação Pública** — sua pauta central, com resultado concreto: Minas em 1º lugar nacional
🗳️ **Democracia** — um valor que ele viveu na pele
⚖️ **Justiça Social** — o fio condutor de toda a sua vida
🌾 **Reforma Agrária e Agricultura Familiar** — experiência do Chile a Minas
🕊️ **Direitos Humanos** — premiado Vladimir Herzog
🌱 **Meio Ambiente e Desenvolvimento Urbano** — gestão concreta em Contagem
✊ **Juventude e Movimentos Sociais** — foi líder estudantil

Quer que eu detalhe alguma dessas? É só dizer o tema.`;
            }
        },

        {
            patterns: ['educacao', 'educação', 'escola', 'professor', 'ensino', 'universidade', 'estudo', 'aluno'],
            action: () => {
                const e = ChatBot.knowledge.eixos.educacao;
                return `📚 **${e.titulo}**

${e.resumo}

${e.pontos.map(p => `• ${p}`).join('\n')}

Como ele costuma dizer: não promete educação — já a transformou.`;
            }
        },

        {
            patterns: ['democracia', 'ditadura', 'liberdade', 'golpe', 'autoritarismo'],
            action: () => {
                const e = ChatBot.knowledge.eixos.democracia;
                return `🗳️ **${e.titulo}**

${e.resumo}

${e.pontos.map(p => `• ${p}`).join('\n')}

${ChatBot.knowledge.faq.democracia}`;
            }
        },

        {
            patterns: ['justica', 'justiça', 'desigualdade', 'pobreza', 'social', 'igualdade'],
            action: () => {
                const e = ChatBot.knowledge.eixos.justica;
                return `⚖️ **${e.titulo}**

${e.resumo}

${e.pontos.map(p => `• ${p}`).join('\n')}`;
            }
        },

        {
            patterns: ['reforma agraria', 'reforma agrária', 'agricultura', 'agraria', 'agrária', 'campo', 'rural', 'terra', 'agricultor'],
            action: () => {
                const e = ChatBot.knowledge.eixos.reformaAgraria;
                return `🌾 **${e.titulo}**

${e.resumo}

${e.pontos.map(p => `• ${p}`).join('\n')}`;
            }
        },

        {
            patterns: ['direitos humanos', 'herzog', 'humanos', 'preso', 'exilio', 'exílio', 'exilado', 'exilada', 'perseguido', 'perseguicao', 'tortura', 'resistencia', 'resistência'],
            action: () => {
                const e = ChatBot.knowledge.eixos.direitosHumanos;
                return `🕊️ **${e.titulo}**

${e.resumo}

${e.pontos.map(p => `• ${p}`).join('\n')}`;
            }
        },

        {
            patterns: ['meio ambiente', 'ambiente', 'sustentavel', 'sustentável', 'urbano', 'cidade', 'clima', 'verde'],
            action: () => {
                const e = ChatBot.knowledge.eixos.meioAmbiente;
                return `🌱 **${e.titulo}**

${e.resumo}

${e.pontos.map(p => `• ${p}`).join('\n')}`;
            }
        },

        {
            patterns: ['juventude', 'jovem', 'jovens', 'estudante', 'movimento estudantil', 'une', 'movimentos sociais'],
            action: () => {
                const e = ChatBot.knowledge.eixos.juventude;
                return `✊ **${e.titulo}**

${e.resumo}

${e.pontos.map(p => `• ${p}`).join('\n')}`;
            }
        },

        {
            patterns: ['lula', 'pt', 'partido dos trabalhadores', 'presidente'],
            action: () => {
                return `🤝 **João Batista e o PT**

${ChatBot.knowledge.faq.lula}

Ele foi o **1º Deputado Estadual do PT em Minas Gerais** (1983–87) e, em 2024, retornou ao partido a convite pessoal do presidente Lula. Concorre agora pelo PT — número **13**.`;
            }
        },

        {
            patterns: ['por que', 'porque', 'motivo', 'razao', 'razão', 'quer ser deputado', 'candidatura', 'se candidatar'],
            action: () => `**Por que João Batista quer ser deputado?**

${ChatBot.knowledge.faq.porQue}`
        },

        {
            patterns: ['diferencial', 'diferente', 'diferencia', 'por que votar', 'melhor candidato', 'o que tem de especial'],
            action: () => {
                const c = ChatBot.knowledge.candidato;
                return `**O que diferencia João Batista:**

${ChatBot.knowledge.faq.diferencial}

${c.posicionamento}

${c.diferenciais.map(d => `• ${d}`).join('\n')}`;
            }
        },

        {
            patterns: ['valores', 'valor', 'principios', 'princípios', 'no que acredita', 'crencas', 'crenças'],
            action: () => {
                const c = ChatBot.knowledge.candidato;
                return `**Os valores que movem João Batista** — os mesmos há mais de cinco décadas:

${c.valores.map(v => `• **${v.nome}** — ${v.desc}`).join('\n')}

*"Eu luto por ideias. E luto por ideias não para impor ideias: respeito o pensamento divergente do meu e não sou melhor do que ninguém."*`;
            }
        },

        {
            patterns: ['numero', 'número', 'votar', 'voto', 'urna', 'eleicao', 'eleição', '13'],
            action: () => {
                const c = ChatBot.knowledge.candidato;
                return `🗳️ **João Batista Mares Guia** — Deputado Federal por Minas Gerais

Partido: **${c.partido}** — número **${c.numero}**
*"${c.slogan}"*

Conte com a gente nessa caminhada.`;
            }
        },

        {
            patterns: ['slogan', 'lema', 'frase', 'tema'],
            action: () => {
                const c = ChatBot.knowledge.candidato;
                return `O tema da campanha é:

**"${c.slogan}"**

Outras frases que vêm da própria voz dele:
• "${c.lema}"
• "Nada a temer. Tudo a construir."
• "Um professor no Congresso."`;
            }
        },

        {
            patterns: ['coerencia', 'coerência', 'ficha', 'honesto', 'integridade', 'corrupcao', 'corrupção'],
            action: () => `**Coerência de 57 anos.**

Desde 1968 até 2026, João Batista manteve os mesmos valores — sem nenhuma virada ideológica de conveniência. Cada proposta tem um fato vivido por trás. Não é discurso: é experiência real, verificável e pública. Numa política de gritos, é quem conversa que se destaca.`,
        },

        {
            patterns: ['livro', 'autor', 'obra', 'escreveu', 'intelectual'],
            action: () => `📖 João Batista é autor do livro **"Coleção Brasil e Democracia"**. Candidato com obra publicada é raro — e confere autoridade intelectual a quem debate as ideias do país.`
        },

        {
            patterns: ['chile', 'allende', 'internacional', 'banco mundial', 'exterior'],
            action: () => `🌎 João Batista tem experiência internacional rara: trabalhou na **reforma agrária do governo Salvador Allende, no Chile**, durante o exílio, e foi **consultor do Banco Mundial** e da Fundação Roberto Marinho. Uma visão que vai além de Minas.`
        },

        {
            patterns: ['ajuda', 'help', 'o que voce faz', 'o que você faz', 'como funciona', 'menu'],
            action: () => `Sou o **vIrAvoto**, assistente da campanha. 🤖

Posso falar sobre:
• 👤 Quem é João Batista e sua trajetória
• 📋 As bandeiras (educação, democracia, justiça social, reforma agrária...)
• 🤝 Seus valores e sua relação com o PT e com Lula
• 🗳️ Como votar — número 13

É só perguntar.`
        },

        {
            patterns: ['tchau', 'obrigado', 'obrigada', 'valeu', 'ate logo', 'até logo', 'adeus', 'agradeco', 'agradeço'],
            action: () => {
                const c = ChatBot.knowledge.candidato;
                return `Foi um prazer conversar com você. 🙏

Lembre-se: **João Batista Mares Guia** — Deputado Federal por Minas, número **${c.numero}**.
*"${c.slogan}"*

Volte sempre que quiser.`;
            }
        }
    ],

    // ====== MOTOR DE RESPOSTA ======
    normalize(text) {
        return (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    },

    matches(normalized, pattern) {
        const p = this.normalize(pattern).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Casa o padrão apenas como palavra(s) inteira(s) — evita "hi" em "historia" ou "oi" em "coisa"
        const re = new RegExp(`(^|[^\\wà-ú])${p}([^\\wà-ú]|$)`, 'i');
        return re.test(normalized);
    },

    processMessage(message) {
        const normalized = this.normalize(message);

        for (const intent of this.intents) {
            for (const pattern of intent.patterns) {
                if (this.matches(normalized, pattern)) {
                    return intent.action({ state: this.state });
                }
            }
        }

        return `Não tenho certeza de que entendi. 🤔 Posso ajudar com algo assim:

• "Quem é João Batista Mares Guia?"
• "Quais são as propostas dele?"
• "Fale sobre educação"
• "Qual a relação dele com o Lula?"
• "Como votar?"

Tente uma dessas, por favor.`;
    },

    // Alias usado pela página de chat por voz (chat.html)
    findResponse(message) {
        return this.processMessage(message);
    },

    // ====== UI (widget flutuante do index.html) ======
    init() {
        this.cacheElements();
        this.bindEvents();
        console.log('[vIrAvoto] IA local inicializada');
    },

    cacheElements() {
        this.elements = {
            toggle: document.querySelector('.chatbot-toggle'),
            window: document.querySelector('.chatbot-window'),
            close: document.querySelector('.chatbot-close'),
            input: document.getElementById('chat-input'),
            send: document.getElementById('chat-send'),
            messages: document.getElementById('chat-messages')
        };
    },

    bindEvents() {
        const { toggle, close, send, input } = this.elements;
        toggle?.addEventListener('click', () => this.toggleWindow());
        close?.addEventListener('click', () => this.closeWindow());
        send?.addEventListener('click', () => this.sendMessage());
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); this.sendMessage(); }
        });
        document.querySelectorAll('.quick-reply').forEach(btn => {
            btn.addEventListener('click', (e) => this.sendMessage(e.target.dataset.message));
        });
    },

    toggleWindow() {
        this.elements.window.classList.toggle('active');
        this.state.isOpen = !this.state.isOpen;
    },

    closeWindow() {
        this.elements.window.classList.remove('active');
        this.state.isOpen = false;
    },

    sendMessage(text = null) {
        const message = text || this.elements.input?.value?.trim();
        if (!message || this.state.isTyping) return;
        if (!text) this.elements.input.value = '';

        this.addMessage(message, 'user');
        this.state.messageCount++;
        this.state.history.push({ role: 'user', content: message });
        this.showTyping();

        setTimeout(() => {
            const response = this.processMessage(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
            this.state.history.push({ role: 'assistant', content: response });
        }, 600 + Math.random() * 400);
    },

    showTyping() {
        this.state.isTyping = true;
        const div = document.createElement('div');
        div.className = 'message bot typing-indicator';
        div.id = 'typing-indicator';
        div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
        const quickReplies = this.elements.messages?.querySelector('.quick-replies');
        if (quickReplies) this.elements.messages.insertBefore(div, quickReplies);
        else this.elements.messages?.appendChild(div);
        this.scrollToBottom();
    },

    hideTyping() {
        this.state.isTyping = false;
        document.getElementById('typing-indicator')?.remove();
    },

    addMessage(text, sender) {
        const messages = this.elements.messages;
        if (!messages) return;
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        const esc = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        div.innerHTML = `<p>${esc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</p>`;
        const quickReplies = messages.querySelector('.quick-replies');
        if (quickReplies) messages.insertBefore(div, quickReplies);
        else messages.appendChild(div);
        this.scrollToBottom();
    },

    scrollToBottom() {
        this.elements.messages?.scrollTo({ top: this.elements.messages.scrollHeight, behavior: 'smooth' });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.chatbot-toggle')) {
        ChatBot.init();
    }
});

window.ChatBot = ChatBot;
