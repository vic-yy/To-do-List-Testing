import userEvent from '@testing-library/user-event';
import MemoForm from '../src/components/MemoForm';
import memoService from '../src/services/memoService';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

// simula o serviço para evitar chamadas reais de API
vi.mock('../src/services/memoService');

describe('MemoForm', () => {
    afterEach(() => {
        cleanup();
    });

    // 1 - deve renderizar os campos de input e o botão
    it('test if forms input and button are rendered', () => {
        render(<MemoForm />);

        expect(screen.getByPlaceholderText(/Adicione o lembrete/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/dd\/mm\/aaaa/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Adicionar/i })).toBeInTheDocument();
    });

    // 2 - deve mostrar erro para formato de data inválido
    it('test if error is shown for invalid date format ', async () => {
        render(<MemoForm />);

        const memoInput = screen.getByPlaceholderText(/Adicione o lembrete/i);
        const dateInput = screen.getByPlaceholderText(/dd\/mm\/aaaa/i);
        const submitButton = screen.getByRole('button', { name: /Adicionar/i });

        await userEvent.type(memoInput, 'Testar o codigo');
        await userEvent.type(dateInput, '25-12-2025'); // Formato inválido
        await userEvent.click(submitButton);

        expect(await screen.findByText(/Formato de data inválido. Use dd\/mm\/aaaa/i)).toBeVisible();
    });

    // 3 - deve mostrar erro para data com mes inválido
    it('test if error is shown for invalid month in date', async () => {
        render(<MemoForm />);

        const memoInput = screen.getByPlaceholderText(/Adicione o lembrete/i);
        const dateInput = screen.getByPlaceholderText(/dd\/mm\/aaaa/i);
        const submitButton = screen.getByRole('button', { name: /Adicionar/i });

        await userEvent.type(memoInput, 'Testar o codigo');
        await userEvent.type(dateInput, '31/13/9999'); // Mês inválido
        await userEvent.click(submitButton);

        expect(await screen.findByText(/Mês inválido./i)).toBeVisible();

        await userEvent.type(dateInput, '31/00/9999'); // Mês inválido

        expect(await screen.findByText(/Mês inválido./i)).toBeVisible();
    });

    // 4 - deve mostrar erro para data com dia inválido
    it('test if error is shown for invalid day in date', async () => {
        render(<MemoForm />);

        const memoInput = screen.getByPlaceholderText(/Adicione o lembrete/i);
        const dateInput = screen.getByPlaceholderText(/dd\/mm\/aaaa/i);
        const submitButton = screen.getByRole('button', { name: /Adicionar/i });

        await userEvent.type(memoInput, 'Testar o codigo');
        await userEvent.type(dateInput, '32/12/9999'); // Dia inválido
        await userEvent.click(submitButton);

        expect(await screen.findByText(/Dia inválido./i)).toBeVisible();

        await userEvent.type(dateInput, '00/12/9999'); // Dia inválido

        expect(await screen.findByText(/Dia inválido./i)).toBeVisible();
    });

    // 5 - deve mostrar erro para uma data no passado
    it('test if error is shown if input date is in the past', async () => {
        render(<MemoForm />);

        const memoInput = screen.getByPlaceholderText(/Adicione o lembrete/i);
        const dateInput = screen.getByPlaceholderText(/dd\/mm\/aaaa/i);
        const submitButton = screen.getByRole('button', { name: /Adicionar/i });

        await userEvent.type(memoInput, 'Testar o codigo');
        await userEvent.type(dateInput, '01/01/2020');
        await userEvent.click(submitButton);

        expect(await screen.findByText(/A data não pode estar no passado/i)).toBeVisible();
    });

    // 6 - deve chamar createMemo e limpar o formulário em uma submissão válida
    it('test if createMemo and fetchMemos are called when the input is valid', async () => {
        memoService.createMemo.mockResolvedValue({});
        render(<MemoForm />);

        const titleInput = screen.getByPlaceholderText(/Adicione o lembrete/i);
        const dateInput = screen.getByPlaceholderText(/dd\/mm\/aaaa/i);
        const submitButton = screen.getByRole('button', { name: /adicionar/i });

        await userEvent.type(titleInput, 'testar codigo');
        await userEvent.type(dateInput, '30/12/9999');
        await userEvent.click(submitButton);

        expect(memoService.createMemo).toHaveBeenCalledWith({ title: 'testar codigo', created_at: '30/12/9999' });

        // Verifica se os campos foram limpos
        expect(titleInput.value).toBe('');
        expect(dateInput.value).toBe('');
    });
});