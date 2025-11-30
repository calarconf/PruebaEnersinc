import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { personasAPI } from '../services/api';

// Thunks asíncronos
export const fetchPersonas = createAsyncThunk(
  'personas/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await personasAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPersonaById = createAsyncThunk(
  'personas/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await personasAPI.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createPersona = createAsyncThunk(
  'personas/create',
  async (persona, { rejectWithValue }) => {
    try {
      const response = await personasAPI.create(persona);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePersona = createAsyncThunk(
  'personas/update',
  async ({ id, persona }, { rejectWithValue }) => {
    try {
      const response = await personasAPI.update(id, persona);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePersona = createAsyncThunk(
  'personas/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await personasAPI.delete(id);
      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const personasSlice = createSlice({
  name: 'personas',
  initialState: {
    items: [],
    selectedPersona: null,
    loading: false,
    error: null,
    lastAction: null,
  },
  reducers: {
    clearSelectedPersona: (state) => {
      state.selectedPersona = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLastAction: (state) => {
      state.lastAction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todas las personas
      .addCase(fetchPersonas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonas.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.lastAction = { type: 'fetch', success: true, message: action.payload.message };
      })
      .addCase(fetchPersonas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error al cargar personas';
        state.lastAction = { type: 'fetch', success: false, message: state.error };
      })
      
      // Fetch persona por ID
      .addCase(fetchPersonaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonaById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPersona = action.payload.data;
      })
      .addCase(fetchPersonaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error al cargar persona';
      })
      
      // Crear persona
      .addCase(createPersona.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPersona.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.data);
        state.lastAction = { type: 'create', success: true, message: action.payload.message };
      })
      .addCase(createPersona.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error al crear persona';
        state.lastAction = { type: 'create', success: false, message: state.error };
      })
      
      // Actualizar persona
      .addCase(updatePersona.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersona.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
        state.lastAction = { type: 'update', success: true, message: action.payload.message };
      })
      .addCase(updatePersona.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error al actualizar persona';
        state.lastAction = { type: 'update', success: false, message: state.error };
      })
      
      // Eliminar persona
      .addCase(deletePersona.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePersona.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(p => p.id !== action.payload.id);
        state.lastAction = { type: 'delete', success: true, message: action.payload.message };
      })
      .addCase(deletePersona.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error al eliminar persona';
        state.lastAction = { type: 'delete', success: false, message: state.error };
      });
  },
});

export const { clearSelectedPersona, clearError, clearLastAction } = personasSlice.actions;
export default personasSlice.reducer;
