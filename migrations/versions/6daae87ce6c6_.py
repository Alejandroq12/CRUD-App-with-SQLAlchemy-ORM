"""empty message

Revision ID: 6daae87ce6c6
Revises: 9a00810a7bc7
Create Date: 2023-01-24 13:31:01.916577

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6daae87ce6c6'
down_revision = '9a00810a7bc7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('todolists', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed', sa.Boolean(), nullable=True))

    with op.batch_alter_table('todos', schema=None) as batch_op:
        batch_op.alter_column('completed',
               existing_type=sa.BOOLEAN(),
               nullable=True)
        batch_op.alter_column('list_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('todos', schema=None) as batch_op:
        batch_op.alter_column('list_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('completed',
               existing_type=sa.BOOLEAN(),
               nullable=False)

    with op.batch_alter_table('todolists', schema=None) as batch_op:
        batch_op.drop_column('completed')

    # ### end Alembic commands ###