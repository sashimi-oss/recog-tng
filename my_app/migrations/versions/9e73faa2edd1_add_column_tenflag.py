"""add column tenflag

Revision ID: 9e73faa2edd1
Revises: d8260db9e505
Create Date: 2024-11-27 19:43:58.428441

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9e73faa2edd1'
down_revision = 'd8260db9e505'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recogs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tenflag', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recogs', schema=None) as batch_op:
        batch_op.drop_column('tenflag')

    # ### end Alembic commands ###